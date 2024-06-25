import React, { useContext } from 'react';
import { PaintWindowContext } from '../context/PaintWindowContext';
import { PaintWindowCanvasResize } from './PaintWindowCanvasResize/PaintWindowCanvasResize';

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
                <PaintWindowCanvasResize />
            </div>
        </div>
       
      
    )

}