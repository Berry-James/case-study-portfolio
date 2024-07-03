import React, { useContext } from 'react';
import { PaintWindowContext } from '../context/PaintWindowContext';
import { PaintWindowCanvasResize } from './PaintWindowCanvasResize/PaintWindowCanvasResize';

/**
 * Canvas element for paint component
 * 
 * @returns Component
 */
export const PaintWindowCanvas = () => {

    // CONTEXT
    const { paintSettings: { canvasZoom, canvasDimensions }, setCanvasRef } = useContext(PaintWindowContext);

    return (
        <div 
            className='h-full w-full p-1'
            style={{
                overflow: 'auto'
            }}
        >
            <div 
                className='relative w-max'
            >

                {/* PAINT CANVAS */}
                <canvas
                    ref={setCanvasRef}
                    height={canvasDimensions.h}
                    width={canvasDimensions.w}
                    style={{
                        backgroundColor: "#FFF",
                        height: `calc(${canvasDimensions.h * canvasZoom}px)`,
                        width: `calc(${canvasDimensions.w * canvasZoom}px)`,
                    }}
                />

                {/* RESIZE BUTTON */}
                <PaintWindowCanvasResize />
            </div>
        </div>
       
      
    )

}