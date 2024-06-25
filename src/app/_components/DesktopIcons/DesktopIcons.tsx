'use client';
import React, { useCallback, useContext } from 'react';
import { DesktopIcon } from './DesktopIcon/DesktopIcon';
import { TASKBAR_HEIGHT } from '../Taskbar/Taskbar';
import { DesktopIconsContext, DesktopIconsContextProvider } from './context/DesktopIconsContext';
import { DESKTOP_ICONS } from '../SystemContext/_static/desktop/desktop.static';
import { SystemContext } from '../SystemContext/SystemContext';

/**
 * Contains all DesktopIcon components within, in a grid format.
 * Wraps them all with the DesktopIconsContextProvider
 * 
 * @returns Component
 */
export const DesktopIcons = () => {

    return (
        <DesktopIconsContextProvider>
            <DesktopIconsContent />
        </DesktopIconsContextProvider>

    )

}

const DesktopIconsContent = () => {

    // CONTEXT
    const { handleSetActiveWindowInstanceId, activeWindowInstanceId } = useContext(SystemContext);
    const { handleSetSelectedDesktopItem, selectedDesktopItem } = useContext(DesktopIconsContext);
    
    /**
     * Clears the active/selected window when clicking on the background
     */
    const handleClickDesktopIcons = useCallback((e: React.MouseEvent<HTMLDivElement>) => {

        // If we are clicking on the background only
        if(e.target && (e.target as HTMLDivElement).id === 'desktopIconsBackground') {

            // If a window is active, set it to inactive
            if(activeWindowInstanceId) {
                handleSetActiveWindowInstanceId(null);
            }

            // If a desktop icon is selected, clear it
            if(selectedDesktopItem) {
                handleSetSelectedDesktopItem(null);
            }
        }

    }, [activeWindowInstanceId, selectedDesktopItem]);

    return (
        <div 
            id='desktopIconsBackground'
            className='fixed top-0 left-0 p-4 flex flex-col gap-8 w-screen'
            style={{
                height: `calc(100vh - ${TASKBAR_HEIGHT}px)`
            }}
            onClick={handleClickDesktopIcons}
        >
            {
                DESKTOP_ICONS.map((icon, iconIndex) => (
                    <DesktopIcon key={icon.id} {...icon} />
                ))
            }
        </div>
    )

}