'use client';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { PaintWindowContext } from '../../context/PaintWindowContext';
import { BsTextareaResize } from 'react-icons/bs';
import { CanvasDimensions } from '../../hooks/usePaint.types';

/**
 * Button used to resize the painting canvas
 * 
 * @returns Component
 */
export const PaintWindowCanvasResize = () => {
    
    // CONTEXT
    const { 
        canvasRef, 
        paintSettings: { 
            canvasDimensions 
        }, 
        isResizing,
        setIsResizing,
        setCanvasDimensions
    } = useContext(PaintWindowContext);

    // REFS
    /**
     * Store the dimensions mid-resize here
     */
    const localCanvasDimensions = useRef({
        w: canvasDimensions.w,
        h: canvasDimensions.h
    });

    /**
     * Store snapshot of canvas ImageData, in order to replace after resize is complete
     */
    const canvasSnapshot = useRef<ImageData | null>(null);

    /**
     * Ref for div that indicates new canavas dimensions when resizing
     */
    const resizeIndicatorRef = useRef<HTMLDivElement | null>(null);

    // HANDLERS
    /**
     * Callback used to resize canvas
     * 
     * Determines new dimensions, stores them in ref, updates resizeIndicatorRef, and returns new dimensions
     */
    const handleResizeCanvas = useCallback((e: MouseEvent) => {

        const newCanvasDimensions: CanvasDimensions = {
            w: localCanvasDimensions.current.w + e.movementX,
            h: localCanvasDimensions.current.h + e.movementY
        }

        localCanvasDimensions.current = newCanvasDimensions;

        if(resizeIndicatorRef.current) {
            resizeIndicatorRef.current.style.height = `${newCanvasDimensions.h}px`
            resizeIndicatorRef.current.style.width = `${newCanvasDimensions.w}px`
        }

        return newCanvasDimensions;

    }, [canvasDimensions, isResizing]);


    /**
     * Callback for mouseDown event
     */
    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {

        // Set state and disable userSelect
        setIsResizing(true);
        (e.target as HTMLElement).style.userSelect = 'none';

        // Snapshot canvas and store in ref
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if(ctx) {
                canvasSnapshot.current = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }

        // Create events
        
        // Mouse Move Event
        const handleMouseMove = (e: MouseEvent) => {
            handleResizeCanvas(e);
        }

        // Mouse Up Event
        const handleMouseUp = (e: MouseEvent) => {
            setIsResizing(false);
            (e.target as HTMLElement).style.userSelect = 'auto';

            // Clear listeners
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            // Resize canvas
            const latestDimensions = handleResizeCanvas(e);
            setCanvasDimensions(latestDimensions);
        }

        // Add listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

    }, [isResizing, canvasDimensions]);

    // Restore canvas contents from snapshot, on update of canvasDimensions in paintSettings state
    useEffect(() => {
        if(canvasRef.current && canvasSnapshot.current) {
            const ctx = canvasRef.current.getContext('2d');
            if(ctx) {
                ctx.putImageData(canvasSnapshot.current, 0, 0);
            }        
        }
    }, [canvasDimensions]);

    return (
        <>

            {/* RESIZE INDICATOR */}
            <div 
                ref={resizeIndicatorRef}
                className='absolute border top-0 left-0 pointer-events-none'
            />

            {/* RESIZE BUTTON */}
            <button 
                className='absolute right-0 bottom-0 cursor-nwse-resize' 
                onMouseDown={handleMouseDown}
            >
                <BsTextareaResize />
            </button>
        </>
       
    )

}