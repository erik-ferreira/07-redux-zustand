import { VideoCamera, PlayCircle } from "phosphor-react"

interface LessonProps {
  title: string
  duration: string
  isCurrent?: boolean
  onPlay: () => void
}

export function Lesson({
  title,
  isCurrent = false,
  duration,
  onPlay,
}: LessonProps) {
  return (
    <button
      onClick={onPlay}
      data-active={isCurrent}
      disabled={isCurrent}
      className="flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-500 data-[active=true]:font-bold enabled:hover:text-zinc-100"
    >
      {isCurrent ? (
        <PlayCircle className="w-4 h-4 text-emerald-500" />
      ) : (
        <VideoCamera className="w-4 h-4 text-zinc-500" />
      )}
      <span className="leading-tight">{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  )
}
