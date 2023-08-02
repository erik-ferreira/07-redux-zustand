import ReactPlayer from "react-player"
import { CircleNotch } from "phosphor-react"

import { useCurrentLesson, useStore } from "../zustand-store"

export function Video() {
  const { currentLesson } = useCurrentLesson()
  const { isAutoPlaying, isLoadingCourse, next } = useStore((state) => {
    return {
      isAutoPlaying: state.isAutoPlaying,
      isLoadingCourse: state.isLoadingCourse,
      next: state.next,
    }
  })

  function handlePlayNext() {
    next()
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoadingCourse ? (
        <div className="flex h-full items-center justify-center">
          <CircleNotch className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          playing={isAutoPlaying}
          onEnded={handlePlayNext}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  )
}
