'use client';
import React, { useContext } from 'react';
import { Windows } from './Windows/Windows';
import { Taskbar } from './Taskbar/Taskbar';
import { DesktopIcons } from './DesktopIcons/DesktopIcons';
import { SystemContext, SystemContextProvider } from './SystemContext/SystemContext';
import { WALLPAPER_DICT } from './SystemContext/_static/theme/theme.static';

/**
 * Root, top-level component
 * Gives access to the SystemContext to the rest of the system
 * 
 * @returns Component
 */
export const Home = () => {

    return (
        <SystemContextProvider>
            <HomeContent />
        </SystemContextProvider>
    )

}

/**
 * Content for the @see {Home} component
 * 
 * @returns Component
 */
const HomeContent = () => {

    // CONTEXT
    const { activeWallpaperId } = useContext(SystemContext);

    return (
        <main 
            className={`min-h-screen overflow-hidden`}
            style={{
                ...WALLPAPER_DICT[activeWallpaperId].style,
            }}
        >
            <Windows />
            <Taskbar />
            <DesktopIcons />
        </main>
    )

}