import { useEffect } from "react"
import { ChatCircle } from "phosphor-react"

import { useCurrentLesson, useStore } from "../zustand-store"

import { Video } from "../components/Video"
import { Header } from "../components/Header"
import { Module } from "../components/Module"
import { Autoplay } from "../components/Autoplay"
import { ModuleSkeleton } from "../components/Module/Skeleton"

export function Player() {
  const { course, isLoadingCourse, load } = useStore((state) => {
    return {
      course: state.course,
      isLoadingCourse: state.isLoadingCourse,
      load: state.load,
    }
  })
  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`
    }
  }, [currentLesson])

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center">
      <div className="flex w-[1200px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <div className="flex items-center gap-4">
            <Autoplay />

            <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
              <ChatCircle className="w-4 h-4" />
              Deixar feedback
            </button>
          </div>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="w-96 border-l border-zinc-800 divide-y-2 divide-zinc-900 bg-zinc-900 overflow-y-scroll absolute top-0 bottom-0 right-0 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-900">
            {isLoadingCourse ? (
              <>
                <ModuleSkeleton defaultOpen />
                <ModuleSkeleton />
                <ModuleSkeleton />
              </>
            ) : (
              course?.modules &&
              course?.modules.map((module, index) => (
                <Module
                  key={module.id}
                  moduleIndex={index}
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                />
              ))
            )}
          </aside>
        </main>
      </div>
    </div>
  )
}
