import { create } from "zustand"
import { persist } from "zustand/middleware"

import { api } from "../lib/api"

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
  isLoadingCourse: boolean
  currentModuleIndex: number
  currentLessonIndex: number
  isAutoPlaying: boolean

  load: () => Promise<void>
  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
  toggleAutoplay: () => void
}

export const useStore = create(
  persist<PlayerState>(
    (set, get) => {
      return {
        course: null,
        isLoadingCourse: true,
        currentModuleIndex: 0,
        currentLessonIndex: 0,
        isAutoPlaying: false,

        load: async () => {
          set({ isLoadingCourse: true })

          const response = await api.get("/courses/1")

          set({ isLoadingCourse: false, course: response.data })
        },

        play: (moduleAndLessonIndex: [number, number]) => {
          const [moduleIndex, lessonIndex] = moduleAndLessonIndex

          set({
            currentModuleIndex: moduleIndex,
            currentLessonIndex: lessonIndex,
          })
        },

        next: () => {
          const { course, currentLessonIndex, currentModuleIndex } = get()

          const nextLessonIndex = currentLessonIndex + 1
          const nextLesson =
            course?.modules[currentModuleIndex].lessons[nextLessonIndex]

          if (nextLesson) {
            set({
              currentLessonIndex: nextLessonIndex,
            })
          } else {
            const nextModuleIndex = currentModuleIndex + 1
            const moduleLesson = course?.modules[nextModuleIndex]

            if (moduleLesson) {
              set({
                currentModuleIndex: nextModuleIndex,
                currentLessonIndex: 0,
              })
            }
          }
        },

        toggleAutoplay: () => {
          const { isAutoPlaying } = get()

          set({
            isAutoPlaying: !isAutoPlaying,
          })
        },
      }
    },
    {
      name: "zustand-store",
    }
  )
)

export const useCurrentLesson = () => {
  return useStore((state) => {
    const { currentModuleIndex, currentLessonIndex } = state

    const currentModule = state.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return { currentModule, currentLesson }
  })
}
