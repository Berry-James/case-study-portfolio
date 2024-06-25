import React, { useCallback, useContext, useState } from 'react';
import { PaintWindowContext } from '../../context/PaintWindowContext';

const PALETTE = [
    '#000000',
    '#767676',
    '#74000c',
    '#77751f',
    '#18761d',
    '#177876',
    '#001372',
    '#740973',
    '#777540',
    '#0b3a39',
    '#157df8',
    '#0a3d73',
    '#3728f6',
    '#753712',
    '#ffffff',
    '#b9b9b9',
    '#fa0019',
    '#fffc43',
    '#34fe3e',
    '#32fffe',
    '#0029f6',
    '#fa14f7',
    '#fffc85',
    '#34ff82',
    '#7ffffe',
    '#767cf8',
    '#fa0075',
    '#fb7144',
]

export const PaintWindowPalette = () => {
    
    // CONTEXT
    const { paintSettings: { colour, secondaryColour }, setPrimaryColour, setSecondaryColour } = useContext(PaintWindowContext);

    // HANDLERS
    const handleSwitchColours = useCallback(() => {
        setPrimaryColour(secondaryColour);
        setSecondaryColour(colour);
    }, [secondaryColour, colour]);

    const handleSetColour = useCallback((newColour: string) => {
        setPrimaryColour(newColour);
    }, []);

    return (
        <div 
            className='flex gap-2 py-2'
        >
            {/* ACTIVE COLOUR */}
            <div className='relative w-8 h-8 win-bezel-inverted'>

                {/* PRIMARY COLOUR */}
                <div 
                    className='w-4 h-4 absolute win-bezel' 
                    style={{
                        backgroundColor: colour,
                        top: '4px',
                        left: '4px',
                        zIndex: 1
                    }}
                />

                {/* SECONDARY COLOUR */}
                <button 
                    className='w-4 h-4 absolute win-bezel' 
                    style={{
                        backgroundColor: secondaryColour,
                        bottom: '4px',
                        right: '4px'
                    }}
                    onClick={handleSwitchColours}
                />
            </div>
            <div 
                className='grid gap-1'
                style={{
                    gridTemplateColumns: 'repeat(14, 1fr)'
                }}
            >
                {
                    PALETTE.map((colour, colourIndex) => (
                        <button 
                            key={`${colourIndex}-${colour}`} 
                            className='w-4 h-4 win-bezel-inverted'
                            style={{
                                backgroundColor: colour
                            }}
                            onClick={() => handleSetColour(colour)}
                        />
                    ))
                }
            </div>
        </div>
    )

}