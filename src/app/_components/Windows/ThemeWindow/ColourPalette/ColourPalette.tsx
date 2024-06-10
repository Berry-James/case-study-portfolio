'use client';
import React, { useContext, useMemo } from 'react';
import { ThemeWindowContext } from '../context/ThemeWindowContext';
import { SYSTEM_HIGHLIGHT_COLOURS } from '@/app/_components/SystemContext/_static/theme/theme.static';

/**
 * Displays all available system highlight colours
 * 
 * @returns Component
 */
export const ColourPalette = () => {

    return (
        <div>

            {/* TITLE */}
            <span>Highlight Colour</span>

            {/* COLOUR GRID */}
            <div className='grid grid-cols-8 w-max gap-1 bg-gray-50'>
                {
                    SYSTEM_HIGHLIGHT_COLOURS.map((colour, colourIndex) => <ColourPaletteItem key={`${colour}-${colourIndex}`} colour={colour} />)
                }
            </div>
            
        </div>
      
    )

}

/**
 * Individual colour item within the ColourPalette component
 * 
 * @param props.colour          colour as an rgb string
 * @returns Component
 */
const ColourPaletteItem = ({ colour }: { colour: string }) => {

    // CONTEXT
    const { handleSetSelectedHighlightColour, selectedHighlightColour } = useContext(ThemeWindowContext);

    // COMPUTED
    /**
     * Compute if this colour is selected
     */
    const isSelected = useMemo(() => selectedHighlightColour === colour, [selectedHighlightColour, colour]);

    // HANDLERS
    /**
     * Sets the highlight colour in context to the current colour
     */
    const handlePaletteItemClick = () => {
        handleSetSelectedHighlightColour(colour);
    }

    return (
        <button
            onClick={handlePaletteItemClick}
            style={{
                backgroundColor: `rgb(${colour})`,
                width: '24px',
                height: '24px',
                border: isSelected ? '2px solid green' : 'none',
                borderRadius: 'none'
            }}
        />
    )

}