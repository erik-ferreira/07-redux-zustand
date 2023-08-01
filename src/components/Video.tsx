import ReactPlayer from "react-player"
import { useDispatch } from "react-redux"

import { useAppSelector } from "../store"
import { next, useCurrentLesson } from "../store/slices/player"

export function Video() {
  const dispatch = useDispatch()
  const { currentLesson } = useCurrentLesson()
  const isAutoPlaying = useAppSelector((state) => state.player.isAutoPlaying)

  function handlePlayNext() {
    dispatch(next())
  }

  if (!currentLesson) return null

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <ReactPlayer
        width="100%"
        height="100%"
        controls
        playing={isAutoPlaying}
        onEnded={handlePlayNext}
        url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
      />
    </div>
  )
}
