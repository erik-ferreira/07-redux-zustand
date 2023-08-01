import { useDispatch } from "react-redux"
import * as Switch from "@radix-ui/react-switch"

import { useAppSelector } from "../store"
import { toggleAutoplay } from "../store/slices/player"

export function Autoplay() {
  const dispatch = useDispatch()
  const isAutoPlaying = useAppSelector((state) => state.player.isAutoPlaying)

  return (
    <label className="cursor-pointer flex gap-2">
      Autoplay
      <Switch.Root
        checked={isAutoPlaying}
        onCheckedChange={() => dispatch(toggleAutoplay())}
        className="w-[42px] h-[25px] bg-zinc-800 rounded-full relative data-[state=checked]:bg-violet-500 outline-none"
      >
        <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
    </label>
  )
}
