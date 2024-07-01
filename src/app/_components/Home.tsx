'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Taskbar } from './Taskbar/Taskbar';
import { DesktopIcons } from './DesktopIcons/DesktopIcons';
import { SystemContext, SystemContextProvider } from './SystemContext/SystemContext';
import { WALLPAPER_DICT } from './SystemContext/_static/theme/theme.static';
import dynamic from 'next/dynamic';

/**
 * Root, top-level component
 * Gives access to the SystemContext to the rest of the system
 * 
 * @returns Component
 */
export const Home = () => {

    return (
        <HomeContent />
    )

}

// Don't ssr windows, as they rely on window dimensions to determine their own sizing/location
const DynamicWindows = dynamic(() => import('./Windows/Windows').then((mod) => mod.Windows), { ssr: false });

/**
 * Content for the @see {Home} component
 * 
 * @returns Component
 */
const HomeContent = () => {

    // CONTEXT
    const { activeWallpaperId, restoreSave } = useContext(SystemContext);

    const [init, setInit] = useState(true);

    useEffect(() => {
        if(init) {
            restoreSave();
            setInit(false);
        }
    }, [init]);

    return (
        <main 
            className={`min-h-screen overflow-hidden`}
            style={{
                ...WALLPAPER_DICT[activeWallpaperId].style,
            }}
        >
            <DynamicWindows />
            <Taskbar />
            <DesktopIcons />
        </main>
    )

}