import React from 'react';
import { PaintWindowBrushes } from './PaintWindowBrushes/PaintWindowBrushes';

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