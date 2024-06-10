'use client';
import React from 'react';
import { DesktopIcon } from './DesktopIcon/DesktopIcon';
import { TASKBAR_HEIGHT } from '../Taskbar/Taskbar';
import { DesktopIconsContextProvider } from './context/DesktopIconsContext';
import { DESKTOP_ICONS } from '../SystemContext/_static/desktop/desktop.static';

/**
 * Contains all DesktopIcon components within, in a grid format.
 * Wraps them all with the DesktopIconsContextProvider
 * 
 * @returns Component
 */
export const DesktopIcons = () => {
    
    return (
        <div 
            className='fixed top-0 left-0 p-4 flex flex-col gap-8 w-screen'
            style={{
                height: `calc(100vh - ${TASKBAR_HEIGHT}px)`
            }}
        >
            <DesktopIconsContextProvider>
                {
                    DESKTOP_ICONS.map((icon, iconIndex) => {
            
                        return (
                            <DesktopIcon key={icon.id} {...icon} />
                        )
                
                    })
                }
            </DesktopIconsContextProvider>
            
        </div>
    )
  

}
