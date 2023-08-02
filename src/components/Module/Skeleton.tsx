import { CaretDown } from "phosphor-react"
import * as Collapsible from "@radix-ui/react-collapsible"

import { LessonSkeleton } from "../Lesson/Skeleton"

interface ModuleSkeletonProps {
  defaultOpen?: boolean
}

export function ModuleSkeleton({ defaultOpen = false }: ModuleSkeletonProps) {
  return (
    <Collapsible.Root className="group animate-pulse" defaultOpen={defaultOpen}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex w-10 h-10 rounded-full bg-slate-700" />

        <div className="flex flex-col gap-1 text-left">
          <div className="w-36 h-4 bg-slate-700 rounded" />
          <div className="w-10 h-3 bg-slate-700 rounded" />
        </div>

        <CaretDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {[1, 2, 3, 4].map((lesson) => (
            <LessonSkeleton key={lesson} />
          ))}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
