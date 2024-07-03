'use client';
import { Windows } from '@/app/_components/Windows/Windows';
import React, { useContext, useEffect, useState } from 'react';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';
import { WindowPosition, windowIdEnum } from '@/app/_components/SystemContext/_static/windows/windows.types';
import { TASKBAR_HEIGHT } from '@/app/_components/Taskbar/Taskbar';
import { WINDOWS_DICT } from '@/app/_components/SystemContext/_static/windows/windows.static';

/**
 * Content for Login page
 * 
 * @returns Component
 */
export const Login = () => {

    // CONTEXT
    const { 
        handleOpenWindow, 
        clearAllWindows,
        windows 
    } = useContext(SystemContext);

    // STATE
    const [init, setInit] = useState(true);

    // SIDE EFFECTS
    useEffect(() => {

        if(init) {
            const windowPosition: WindowPosition = {
                ...WINDOWS_DICT[windowIdEnum.login].position,
                x: (window.innerWidth / 2) - (WINDOWS_DICT[windowIdEnum.login].position.w / 2),
                y: (window.innerHeight / 2) - (WINDOWS_DICT[windowIdEnum.login].position.h / 2) - TASKBAR_HEIGHT,
            }
    
            if(Object.keys(windows).length > 0) {
                clearAllWindows().then(() => handleOpenWindow(windowIdEnum.login, { position: windowPosition }));
            } else {
                handleOpenWindow(windowIdEnum.login, { position: windowPosition })
            }
            setInit(false);
        }

       
    }, [windows, init]);

    return (
        <Windows />
    )

}
