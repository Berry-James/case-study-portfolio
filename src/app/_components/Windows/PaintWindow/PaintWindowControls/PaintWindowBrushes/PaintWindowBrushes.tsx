import React, { useContext, useMemo } from 'react';
import { paintBrushEnum } from '../../hooks/usePaint.types';
import { PaintWindowContext } from '../../context/PaintWindowContext';
import { PAINT_BRUSH_DICT } from '../../hooks/usePaint.static';

/**
 * Displays all brushes available
 * 
 * @returns Component
 */
export const PaintWindowBrushes = () => {

    // CONTEXT
    const { paintSettings: { brush }, setBrush } = useContext(PaintWindowContext);

    // COMPUTED
    /**
     * Compute and memoise list of all brushes as button elements
     */
    const Brushes = useMemo(() => {
        return Object.values(PAINT_BRUSH_DICT).map((staticBrush, staticBrushIndex) => {

            return (
                <button 
                    className={`w-8 h-8 p-1 ${brush === staticBrush.id ? 'win-bezel-inverted' : 'win-bezel'}`}
                    key={staticBrush.id} 
                    onClick={() => setBrush(staticBrush.id as paintBrushEnum)}
                >
                    {staticBrush.icon}
                </button>
            )
        })
    }, [brush]);

    return (
        <div className='grid grid-cols-2 p-1.5'>
            {Brushes}
        </div>
    )

}