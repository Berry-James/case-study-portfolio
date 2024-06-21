import { WindowPosition } from "@/app/_components/SystemContext/_static/windows/windows.types"
import { MutableRefObject } from "react"

export type UseWindowInteractivity = (args: { 
    onDrag: ({ x, y }: { x: number, y: number }) => void,
    onDragStart?: () => void,
    onDragEnd?: ({ x, y }: { x: number, y: number }) => void,
    onResizeEnd?: ({ w, h }: { w: number, h: number }) => void,
    initialWindowPosition?: Partial<WindowPosition>
}) => ({
    windowRef: (elem: HTMLDivElement | null) => void, 
    moveButtonRef: (elem: HTMLElement | null) => void, 
    resizeButtonRef: (elem: HTMLElement | null) => void, 
    isMoving: boolean, 
    isResizing: boolean
})
