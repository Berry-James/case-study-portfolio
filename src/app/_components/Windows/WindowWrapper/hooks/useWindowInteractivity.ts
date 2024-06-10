'use client';
import { WindowPosition } from "@/app/_components/SystemContext/_static/windows/windows.types";
import { useCallback, useEffect, useRef, useState } from "react";
import { UseWindowInteractivity } from "./useWindowInteractivity.types";

/**
 * Throttle/Debouncer
 * 
 * @param f             Function 
 * @returns 
 */
export const throttle = (f: Function) => {

    let token: number | null = null;
    let lastArgs: unknown[] | null = null;

    const invoke = () => {
        f(...lastArgs || []);
        token = null;
    };

    const result = (...args: unknown[]) => {
        lastArgs = args;
        if (!token) {
            token = requestAnimationFrame(invoke);
        }
    };

    result.cancel = () => token && cancelAnimationFrame(token);
    return result;
};
  
/**
 * Hook used to manage window moving and resizing
 * 
 * @param props.onDrag              Callback fired when window dragging is happening
 * @param props.onDragStart         Callback fired when window dragging starts
 * @param props.onDragEnd           Callback fired when window dragging ends
 * @param props.onResizeEnd         Callback fired when window resizing ends
 * @param initialWindowPosition     Initial window position on component first mount
 * 
 * @returns a lot
 */
export const useWindowInteractivity: UseWindowInteractivity = ({ 
    onDrag, 
    onDragStart,
    onDragEnd,
    onResizeEnd,
    initialWindowPosition,
}) => {

    // STATE
    /**
     * Is the window currently being moved?
     */
    const [isMoving, setIsMoving] = useState(false);

    /**
     * Is the window currently being resized?
     */
    const [isResizing, setIsResizing] = useState(false);
  
    // REFS
    /**
     * Ref for the window object we are resizing/moving
     */
    const windowRef = useRef<HTMLDivElement | null>(null);

    /**
     * Position of the window in the DOM
     */
    const position = useRef<WindowPosition>({
        x: initialWindowPosition?.x !== undefined ? initialWindowPosition.x : 0,
        y: initialWindowPosition?.y !== undefined ? initialWindowPosition.y : 0,
        z: initialWindowPosition?.z !== undefined ? initialWindowPosition.z : 0,
        w: initialWindowPosition?.w !== undefined ? initialWindowPosition.w : 600,
        h: initialWindowPosition?.h !== undefined ? initialWindowPosition.h : 400,
    });

    /**
     * Button used to resize the window
     */
    const resizeButtonRef = useRef<Element | null>(null);

    /**
     * Bar/button used to drag/reposition the window
     */
    const moveButtonRef = useRef<Element | null>(null);

    /**
     * 
     */
    const unsubscribe = useRef<Function | null>(null);

    const movementUnsub = useRef<Function | null>(null);

    // CALLBACKS

    /**
     * Computed ref for the movement drag handle/bar/button
     */
    const legacyMoveButtonRef = useCallback((elem: Element | null) => {

        moveButtonRef.current = elem;

        if (unsubscribe.current) {
            unsubscribe.current();
        }

        if (!elem) {
            return;
        }

        const handleMouseDown = (e: Event) => {
            (e.target as HTMLDivElement).style.userSelect = "none";
            setIsMoving(true);
        };

        elem.addEventListener("mousedown", handleMouseDown);

        movementUnsub.current = () => {
            elem.removeEventListener("mousedown", handleMouseDown);
        };

    }, []);

    
    /**
     * Computed ref for the resize button
     */
    const legacyResizeButtonRef = useCallback((elem: HTMLElement | null) => {
        
        resizeButtonRef.current = elem;
  
        if (unsubscribe.current) {
          unsubscribe.current();
        }
  
        if (!elem) {
          return;
        }
  
        const handleMouseDown = (e: Event) => {
          (e.target as HTMLElement).style.userSelect = "none";
          setIsResizing(true);
        };
  
        elem.addEventListener("mousedown", handleMouseDown);
  
        unsubscribe.current = () => {
          elem.removeEventListener("mousedown", handleMouseDown);
        };

    }, []);

    /**
     * Handle Resizing
     */
    useEffect(() => {

        if(!isResizing) { return }

        const handleMouseUp = (e: Event) => {
            (e.target as HTMLDivElement).style.userSelect = "auto";
            setIsResizing(false);
            if(onResizeEnd) {
                onResizeEnd(position.current);
            }
        };

        const handleMouseMove = throttle((event: MouseEvent) => {
                
            if (!windowRef.current || !position.current) {
                return;
            }


            const elem = windowRef.current;
    
            const newDimensions = {
                h: elem.offsetHeight + event.movementY,
                w: elem.offsetWidth + event.movementX
            }

            position.current = {
                ...position.current,
                ...newDimensions
            }
    
            elem.style.width = `${newDimensions.w}px`
            elem.style.height = `${newDimensions.h}px`
           
        });

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
  
        return () => {
            handleMouseMove.cancel();
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

    }, [isResizing]);
  
    /**
     * Handle Moving
     */
    useEffect(() => {

        if (!isMoving) {
            return;
        }

        const handleMouseMove = throttle((event: MouseEvent) => {

            if (!windowRef.current || !position.current) {
                return;
            }

            const pos = position.current;
            const elem = windowRef.current;

            const newPosition = {
                x: Math.min(Math.max(pos.x + event.movementX), window.innerWidth),
                y: pos.y + event.movementY
            };

            position.current = {
                ...position.current,
                ...newPosition
            };
            onDrag(newPosition)

            // position.current = {
            //     x: Math.min(Math.max(pos.x + event.movementX), window.innerWidth),
            //     y: pos.y + event.movementY
            // };

            // onDrag({ x, y });

            elem.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
            
        });

        const handleMouseUp = (e: MouseEvent) => {
            (e.target as HTMLDivElement).style.userSelect = "auto";
            setIsMoving(false);
            if(onDragEnd) {
                onDragEnd(position.current);
            }
        };
    
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        handleMouseMove.cancel();
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    
    }, [isMoving, onDrag]);
  
    
    return {
        windowRef, 
        moveButtonRef: legacyMoveButtonRef, 
        resizeButtonRef: legacyResizeButtonRef, 
        isMoving, 
        isResizing
    }
  
};
