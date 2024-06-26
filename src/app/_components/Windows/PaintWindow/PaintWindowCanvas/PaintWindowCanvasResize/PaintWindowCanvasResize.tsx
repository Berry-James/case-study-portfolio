import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { PaintWindowContext } from '../../context/PaintWindowContext';
import { BsTextareaResize } from 'react-icons/bs';
import { CanvasDimensions } from '../../hooks/usePaint.types';

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

    // STATE
    // const [isResizing, setIsResizing] = useState(false);

    const localCanvasDimensions = useRef({
        w: canvasDimensions.w,
        h: canvasDimensions.h
    });
    const canvasSnapshot = useRef<ImageData | null>(null);
    const resizeIndicatorRef = useRef<HTMLDivElement | null>(null);

    // HANDLERS
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

        // if(canvasRef.current) {
        //     canvasRef.current.width = newCanvasDimensions.w;
        //     canvasRef.current.height = newCanvasDimensions.h;
        // }

        return newCanvasDimensions;

    }, [canvasDimensions, isResizing]);


    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {

        setIsResizing(true);
        (e.target as HTMLElement).style.userSelect = 'none';

        // Snapshot canvas
        if(canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if(ctx) {
                canvasSnapshot.current = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }

        // Create events
        const handleMouseMove = (e: MouseEvent) => {
            handleResizeCanvas(e);
        }

        const handleMouseUp = (e: MouseEvent) => {
            setIsResizing(false);
            (e.target as HTMLElement).style.userSelect = 'auto';

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            const latestDimensions = handleResizeCanvas(e);
            
            setCanvasDimensions(latestDimensions);
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

    }, [isResizing, canvasDimensions]);

    // restore snapshot
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
            <div 
                ref={resizeIndicatorRef}
                className='absolute border top-0 left-0 pointer-events-none'
            />
            <button 
                className='absolute right-0 bottom-0 cursor-nwse-resize' 
                onMouseDown={handleMouseDown}
            >
                <BsTextareaResize />
            </button>
        </>
       
    )

}