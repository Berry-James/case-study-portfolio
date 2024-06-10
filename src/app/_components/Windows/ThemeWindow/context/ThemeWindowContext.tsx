import React, { PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';
import { IThemeWindowContext } from './ThemeWindowContext.types';
import { wallpaperIdEnum } from '@/app/_components/SystemContext/_static/theme/theme.types';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';
import { SYSTEM_HIGHLIGHT_COLOURS } from '@/app/_components/SystemContext/_static/theme/theme.static';

/**
 * Functional context for the theme window/application
 * @implements {IThemeWindowContext}
 * 
 * @returns React Context
 */
export const ThemeWindowContext = createContext<IThemeWindowContext>({
    selectedWallpaperId: wallpaperIdEnum.default,
    selectedHighlightColour: SYSTEM_HIGHLIGHT_COLOURS[0],
    handleSetSelectedHighlightColour: (newSelectedHighlightColour: string) => undefined,
    handleSetSelectedWallpaper: (newSelectedWallpaperId: wallpaperIdEnum) => undefined,
    handleApplyTheme: () => undefined
});

/**
 * Provider for @see {ThemeWindowContext}
 * 
 * @param props.children            Child components
 * @returns Component
 */
export const ThemeWindowContextProvider = ({ children }: PropsWithChildren) => {

    // CONTEXT
    const { highlightColour, activeWallpaperId, handleSetActiveWallpaperId, handleSetHighlightColour } = useContext(SystemContext);

    // STATE
    /**
     * Id of the currently selected wallpaper within the window
     */
    const [selectedWallpaperId, setSelectedWallpaperId] = useState(activeWallpaperId);

    /**
     * RGB string of the currently selected highlight colour within the window
     */
    const [selectedHighlightColour, setSelectedHighlightColour] = useState(highlightColour);

    // HANDLERS
    /**
     * Sets the selectedWallpaperId state to the new value
     * 
     * @param newSelectedWallpaperId            New wallpaperId
     * @returns void
     */
    const handleSetSelectedWallpaper = (newSelectedWallpaperId: wallpaperIdEnum) => setSelectedWallpaperId(newSelectedWallpaperId);

    /**
     * Sets the selectedHighlightColour state to the given value
     * 
     * @param newSelectedHighlightColour            New highlight colour RGB string
     */
    const handleSetSelectedHighlightColour = useCallback((newSelectedHighlightColour: string) => setSelectedHighlightColour(newSelectedHighlightColour), []);

    /**
     * Applies the local selectedWallpaperId and selectedHighlightColour to SystemContext state
     */
    const handleApplyTheme = useCallback(() => {
        handleSetActiveWallpaperId(selectedWallpaperId);
        handleSetHighlightColour(selectedHighlightColour);
    }, [selectedWallpaperId, selectedHighlightColour]);

    return (
        <ThemeWindowContext.Provider
            value={{
                selectedWallpaperId,
                selectedHighlightColour,
                handleSetSelectedWallpaper,
                handleSetSelectedHighlightColour,
                handleApplyTheme
            }}
        >
            {children}
        </ThemeWindowContext.Provider>
    )

}