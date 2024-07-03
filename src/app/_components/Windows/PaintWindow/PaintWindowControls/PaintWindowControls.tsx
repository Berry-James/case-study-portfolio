import React from 'react';
import { PaintWindowBrushes } from './PaintWindowBrushes/PaintWindowBrushes';

/**
 * Wrapper for all paint window controls
 * This will eventually contain any extra controls aside from just brushes
 * 
 * @returns 
 */
export const PaintWindowControls = () => {

    return (
        <div
            className='win-bezel m-0.5'
            style={{
                backgroundColor: 'var(--lightGrey)'
            }}
        >
            {/* BRUSHES */}
            <PaintWindowBrushes />

        </div>
    )

}