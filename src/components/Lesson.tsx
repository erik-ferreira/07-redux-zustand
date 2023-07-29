import { VideoCamera } from "phosphor-react"

interface LessonProps {
  title: string
  duration: string
}

export function Lesson({ title, duration }: LessonProps) {
  return (
    <button className="flex items-center gap-3 text-sm text-zinc-400">
      <VideoCamera className="w-4 h-4 text-zinc-500" />
      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  )
}
