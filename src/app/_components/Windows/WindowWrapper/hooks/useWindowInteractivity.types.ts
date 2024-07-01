import { WindowPosition } from "@/app/_components/SystemContext/_static/windows/windows.types"

/**
 * @member onDrag                   Callback that fires when window is dragged
 * @member onDragStart              (optional) Callback that fires when window drag begins
 * @member onDragEnd                (optional) Callback that fires when window drag ends
 * @member onResizeEnd              (optional) Callback that fires when window resize ends
 * @member initialWindowPosition    (optional) Set the window position initially
 * 
 * @member windowRef                Ref for window component
 * @member moveButtonRef            Ref for move button (i.e window toolbar) to add drag listeners to
 * @member resizeButtonRef          Ref for resize button ref (i.e. in bottom right corner) to add resize listeners to
 * @member isMoving                 State which indicates if window is being moved
 * @member isResizing               State which indicates if window is being resized
 */
export type UseWindowInteractivity = (args: { 
    onDrag: ({ x, y }: { x: number, y: number }) => void,
    onDragStart?: () => void,
    onDragEnd?: ({ x, y }: { x: number, y: number }) => void,
    onResizeEnd?: ({ w, h }: { w: number, h: number }) => void,
    initialWindowPosition?: Partial<WindowPosition>
    windowPosition: WindowPosition
}) => ({
    windowRef: (elem: HTMLDivElement | null) => void, 
    moveButtonRef: (elem: HTMLElement | null) => void, 
    resizeButtonRef: (elem: HTMLElement | null) => void, 
    isMoving: boolean, 
    isResizing: boolean
})
