import ReactPlayer from "react-player"
import { CircleNotch } from "phosphor-react"

import { useAppDispatch, useAppSelector } from "../store"
import { next, useCurrentLesson } from "../store/slices/player"

export function Video() {
  const dispatch = useAppDispatch()
  const { currentLesson } = useCurrentLesson()
  const { isAutoPlaying, isLoadingCourse } = useAppSelector((state) => {
    const { isAutoPlaying, isLoadingCourse } = state.player

    return { isAutoPlaying, isLoadingCourse }
  })

  function handlePlayNext() {
    dispatch(next())
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
