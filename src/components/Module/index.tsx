import { CaretDown } from "phosphor-react"
import * as Collapsible from "@radix-ui/react-collapsible"

import { play } from "../../store/slices/player"
import { useAppDispatch, useAppSelector } from "../../store"

import { Lesson } from "../Lesson"

interface ModuleProps {
  moduleIndex: number
  title: string
  amountOfLessons: number
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const dispatch = useAppDispatch()

  const { lessons, currentModuleIndex, currentLessonIndex, isLoadingCourse } =
    useAppSelector((state) => {
      const { currentModuleIndex, currentLessonIndex, isLoadingCourse } =
        state.player
      const lessons = state.player.course?.modules[moduleIndex].lessons

      return {
        lessons,
        currentModuleIndex,
        currentLessonIndex,
        isLoadingCourse,
      }
    })

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex w-10 h-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <CaretDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((lesson, lessonIndex) => {
              const isCurrent =
                currentModuleIndex === moduleIndex &&
                currentLessonIndex === lessonIndex

              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  onPlay={() => dispatch(play([moduleIndex, lessonIndex]))}
                  isCurrent={isCurrent}
                />
              )
            })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
