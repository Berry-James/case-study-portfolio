import React, { PropsWithChildren, createContext, useState } from 'react';
import { IDesktopIconsContext } from './DesktopIconsContext.types';

/**
 * Functional context for the Desktop Icons
 * @implements {IDesktopIconsContext}
 * 
 * @returns Context
 */
export const DesktopIconsContext = createContext<IDesktopIconsContext>({
    selectedDesktopItem: null,
    handleSetSelectedDesktopItem: (newSelectedDesktopItem: string | null) => undefined
});

/**
 * Provider for @see {DesktopIconsContext}
 * 
 * @param props.children            Child components 
 * @returns Context Provider (Component)
 */
export const DesktopIconsContextProvider = ({ children }: PropsWithChildren) => {

    // STATE
    /**
     * The currently selected desktop icon (has been clicked)
     */
    const [selectedDesktopItem, setSelectedDesktopItem] = useState<string | null>(null);

    // HANDLERS
    /**
     * Sets the selected desktop item to the given value
     * 
     * @param newSelectedDesktopItem        A string representing the ID of the new selected desktop item
     * @returns void
     */
    const handleSetSelectedDesktopItem = (newSelectedDesktopItem: string | null) => setSelectedDesktopItem(newSelectedDesktopItem); 

    return (
        <DesktopIconsContext.Provider
            value={{
                selectedDesktopItem,
                handleSetSelectedDesktopItem
            }}
        >
            {children}
        </DesktopIconsContext.Provider>
    )

}