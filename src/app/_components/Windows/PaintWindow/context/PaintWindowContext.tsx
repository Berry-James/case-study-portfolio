import React, { PropsWithChildren, createContext } from 'react';
import { usePaint } from '../hooks/usePaint';
import { CanvasDimensions, UsePaint, UsePaintReturn, paintBrushEnum } from '../hooks/usePaint.types';

/**
 * Functional context for the PaintWindow component
 * Functionality is exclusively what is contained within usePaint hook,
 * and this context is used to sync paint state with all components in module
 * 
 * @see PaintWindow
 * @implements {UsePaintReturn}
 * 
 * @returns Context
 */
export const PaintWindowContext = createContext<UsePaintReturn>({
    // SETTINGS
    paintSettings: {
        colour: '',
        secondaryColour: '',
        brush: paintBrushEnum.pencil,
        canvasDimensions: {
            w: 0,
            h: 0
        },
        canvasZoom: 0
    },
    isResizing: false,

    setIsResizing: (newIsResizing: boolean) => undefined, 

    // CANVAS ELEMENT
    setCanvasRef: (element: HTMLCanvasElement | null) => null,
    canvasRef: { current: null },

    // CALLBACKS
    setCanvasZoom: (newCanvasZoom: number) => undefined,
    setPrimaryColour: (newColour: string) => undefined,
    setSecondaryColour: (newColour: string) => undefined,
    setBrush: (newBrush: paintBrushEnum) => undefined,
    setCanvasDimensions: (newCanvasSize: CanvasDimensions) => undefined,
    downloadCanvasAsFile: () => undefined
});

export const PaintWindowContextProvider = ({ children }: PropsWithChildren) => {

    // HOOKS
    const paint = usePaint();

    return (
        <PaintWindowContext.Provider
            value={{
                ...paint
            }}
        >
            { children }
        </PaintWindowContext.Provider>
    )

}