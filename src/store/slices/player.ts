import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { useAppSelector } from ".."
import { api } from "../../lib/api"

interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
  isAutoPlaying: boolean
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isAutoPlaying: false,
}

export const loadCourse = createAsyncThunk("player/load", async () => {
  const response = await api.get("courses/1")

  return response.data
})

const playerSlice = createSlice({
  name: "player",
  initialState,

  reducers: {
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0]
      state.currentLessonIndex = action.payload[1]
    },

    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1
        const moduleLesson = state.course?.modules[nextModuleIndex]

        if (moduleLesson) {
          state.currentModuleIndex = nextModuleIndex
          state.currentLessonIndex = 0
        }
      }
    },

    toggleAutoplay: (state) => {
      state.isAutoPlaying = !state.isAutoPlaying
    },
  },

  extraReducers(builder) {
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload
    })
  },
})

export const player = playerSlice.reducer
export const { play, next, toggleAutoplay } = playerSlice.actions

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player

    const currentModule = state.player.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
}
