import React, { ChangeEvent, useCallback, useContext } from 'react';
import { PaintWindowContext } from '../context/PaintWindowContext';
import { PaintWindowPalette } from '../PaintWindowControls/PaintWindowPalette/PaintWindowPalette';

export const PaintWindowFooter = () => {

    // CONTEXT
    const { paintSettings: { canvasZoom }, setCanvasZoom } = useContext(PaintWindowContext);

    const handleSetCanvasZoom = (variant: 'increment' | 'decrement') => {
        const newZoom = Math.min(canvasZoom + (variant === 'increment' ? .2 : -.2), 5)
        setCanvasZoom(newZoom < 0.1 ? 0.1 : newZoom);
    }

    const handleSetCanvasZoomSlider = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setCanvasZoom(Number(e.target.value))
    }, []);

    return (
        <footer 
            className='border flex items-center justify-end win-bezel h-16'
            style={{
                backgroundColor: 'var(--lightGrey)',
                display: 'grid',
                gridTemplateColumns: '1fr max-content'
            }}
        >
            {/* PALETTE */}
            <PaintWindowPalette />

            {/* CANVAS ZOOM CONTROLS */}
            {/* <div className='flex items-center gap-1 justify-center'>
                <button className='text-button' onClick={() => handleSetCanvasZoom('decrement')}>
                    -
                </button>
                <input 
                    type='range' 
                    step={.1}
                    min={0}
                    max={5}
                    value={canvasZoom}
                    onChange={handleSetCanvasZoomSlider}
                />
                <button className='text-button' onClick={() => handleSetCanvasZoom('increment')}>
                    +
                </button>
            </div> */}

            {/* <span>ZOOM FACTOR: {canvasZoom}</span> */}
           
        </footer>
    )

}