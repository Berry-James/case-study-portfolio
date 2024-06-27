'use client';
import React, { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import { ISystemContext } from './SystemContext.types';
import { wallpaperIdEnum } from './_static/theme/theme.types';
import { IWindow, IWindowTemplate, WindowPosition, windowIdEnum, windowStatusEnum } from './_static/windows/windows.types';
import { useSave } from './hooks/useSave';
import { WINDOWS_DICT } from './_static/windows/windows.static';
import { v4 as uuid } from 'uuid';
import { SYSTEM_HIGHLIGHT_COLOURS } from './_static/theme/theme.static';
import { formatVolume } from '@/utils/audioUtils';
import { TASKBAR_HEIGHT } from '../Taskbar/Taskbar';

export const SystemContext = createContext<ISystemContext>({
    windows: {},
    activeWallpaperId: wallpaperIdEnum.clouds,
    activeWindowInstanceId: null,                
    highlightColour: SYSTEM_HIGHLIGHT_COLOURS[0],
    volume: .8,
    isMuted: false,
    handleSetIsMuted: (newIsMuted: boolean) => undefined,
    handleSetVolume: (newVolume: number) => undefined,
    handleSetHighlightColour: (newHighlightColour: string) => undefined,
    handleSetWindowStatus: (instanceId: string, newStatus: windowStatusEnum) => undefined,
    handleSetWindowPosition: (instanceId: string, newPos: Partial<WindowPosition>) => undefined,
    handleSetActiveWallpaperId: (newActiveWallpaperId: number) => undefined,
    handleSetActiveWindowInstanceId: (instanceId: string | null) => undefined,
    handleOpenWindow: (id: windowIdEnum, windowOverride?: Partial<IWindowTemplate>) => '',
    handleCloseWindow: (instanceId: string) => undefined,
    clearAllWindows: () => new Promise((resolve) =>  undefined),
    restoreSave: () => undefined,
});

export const SystemContextProvider = ({ children }: PropsWithChildren) => {

    // STATE
    const [windows, setWindows] = useState<Record<string, IWindow>>({});
    const [activeWallpaperId, setActiveWallpaperId] = useState<wallpaperIdEnum>(wallpaperIdEnum.clouds);
    const [activeWindowInstanceId, setActiveWindowInstanceId] = useState<string | null>(null);
    const [highlightColour, setHighlightColour] = useState<string>(SYSTEM_HIGHLIGHT_COLOURS[0]);

    // Audio
    const [volume, setVolume] = useState(.8);
    const [isMuted, setIsMuted] = useState(false);

    // HOOKS
    const legacySave = useSave({
        windows, 
        activeWallpaperId, 
        activeWindowInstanceId, 
        highlightColour
    });

    // TODO -> refactor this into the useSave hook and treat it more like a redux store/reducer type vibe
    // useEffect(() => {

       
    // }, [legacySave]);

    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--highlight', highlightColour)
    }, [highlightColour]);

    const restoreSave = () => {

        if(legacySave) {
            if(
                legacySave.activeWallpaperId !== undefined &&
                legacySave.activeWallpaperId in wallpaperIdEnum
            ) {
                setActiveWallpaperId(legacySave.activeWallpaperId);
            }
            if(legacySave.activeWindowInstanceId !== undefined) {
                setActiveWindowInstanceId(legacySave.activeWindowInstanceId);
            } 
            if(legacySave.windows && Object.keys(legacySave.windows).length) {
                setWindows(legacySave.windows);
            } else {
                handleOpenWindow(
                    windowIdEnum.portfolio, 
                    { 
                        position: { 
                            ...WINDOWS_DICT[windowIdEnum.portfolio].position,
                            x: (window.innerWidth / 2) - (WINDOWS_DICT[windowIdEnum.portfolio].position.w / 2), 
                            y: (window.innerHeight / 2) - (WINDOWS_DICT[windowIdEnum.portfolio].position.h / 2) - TASKBAR_HEIGHT
                        } 
                    })
            }
            if(legacySave.highlightColour) {
                setHighlightColour(legacySave.highlightColour)
            }
        } 
        // else {

        //     // TODO -> move this logic to within 'Home.tsx' component, as we only want it to run there
            
        //     // No save, set some defaults

        //     // Calc window position
        //     const x = (window.innerWidth / 2) - (WINDOWS_DICT[windowIdEnum.portfolio].position.w / 2);
        //     const y = (window.innerHeight / 2) - (WINDOWS_DICT[windowIdEnum.portfolio].position.h / 2) - TASKBAR_HEIGHT;

        //     const instanceId = uuid();
        //     setWindows({
        //         [instanceId]: {
        //             instanceId,
        //             status: windowStatusEnum.open,
        //             ...WINDOWS_DICT[windowIdEnum.portfolio],
        //             position: {
        //                 ...WINDOWS_DICT[windowIdEnum.portfolio].position,
        //                 x,
        //                 y
        //             }
        //         }
        //     });
        //     setActiveWindowInstanceId(instanceId);
        // }
    }

    const handleSetVolume = (newVolume: number | string) => {
        const parsedVolume = formatVolume(newVolume);
        if(parsedVolume) {
            setVolume(parsedVolume) 
        }
    }

    const handleSetIsMuted = (newIsMuted: boolean) => setIsMuted(newIsMuted);

    const handleSetHighlightColour = useCallback((newHighlightColour: string) => setHighlightColour(newHighlightColour), []);

    const handleOpenWindow = (id: windowIdEnum, windowOverride?: Partial<IWindowTemplate>) => {

        console.log('### OVERRIDE', windowOverride);

        // If window template is 'solo'
        if(WINDOWS_DICT[id].rules?.solo) {

            // Find instance ID of window in windows state (if it exists)
            const existingWindow = Object.values(windows).find(existingWindow => existingWindow.id === id);

            if(existingWindow?.instanceId !== undefined) {

                // ensure the windows status is open
                if(existingWindow.status !== windowStatusEnum.open) {
                    setWindows((prevState) => {
                        return {
                            ...prevState,
                            [existingWindow.instanceId]: {
                                ...prevState[existingWindow.instanceId],
                                ...windowOverride,
                                status: windowStatusEnum.open
                            }
                        }
                    })
                }

                // Make this the active window
                handleSetActiveWindowInstanceId(existingWindow.instanceId);
                return existingWindow.instanceId;
            }
        }

        // Otherwise, window is not 'solo', or does not yet exist
        const instanceId = uuid();
        setWindows((prevState) => {
            return {
                ...prevState,
                [instanceId]: {
                    instanceId,
                    status: windowStatusEnum.open,
                    ...WINDOWS_DICT[id],
                    ...windowOverride,
                }
            }
        });

        // Make this the active window
        handleSetActiveWindowInstanceId(instanceId);

        return instanceId;

    }

    const handleCloseWindow = (instanceId: string) => {

        // Check if a window with this instance ID exists
        if(windows[instanceId]) {
            setWindows((prevState) => {
                const copy = {...prevState};

                delete copy[instanceId];

                return copy;
            })
        }

    }

    const handleSetWindowStatus = (instanceId: string, newStatus: windowStatusEnum) => {
        setWindows((prevState) => {

            switch(newStatus) {
                case windowStatusEnum.open: 
                case windowStatusEnum.minimised: {

                    // If window exists in windows context, update status
                    if(prevState[instanceId]) {
                        return {
                            ...prevState,
                            [instanceId]: {
                                ...prevState[instanceId],
                                status: newStatus
                            }
                        }

                    // Otherwise, return previous state

                    }
                    return prevState;
                }
                case windowStatusEnum.closed: {
                    const copy = {...prevState};
                    delete copy[instanceId];
                    return copy;
                }
            }

        })
    }

    /**
     * Update the position of the window by the given ID
     * 
     * @param id            ID of the window to be updated
     * @param newPos        Position of the window (x, y, z)
     */
    const handleSetWindowPosition = (instanceId: string, newPos: Partial<WindowPosition>) => {

        setWindows((prevState) => {
            const ret = {
                ...prevState,
                [instanceId]: {
                    ...prevState[instanceId],
                    position: {
                        ...prevState[instanceId]?.position,
                        ...newPos
                    }
                }
            }
            return ret;
        });

    }

    const handleSetActiveWindowInstanceId = (instanceId: string | null) => setActiveWindowInstanceId(instanceId);

    const handleSetActiveWallpaperId = (newActiveWallpaperId: number) => setActiveWallpaperId(newActiveWallpaperId);

    const clearAllWindows = async (): Promise<void> => {
        return new Promise((resolve) => {
            setWindows({});
            setActiveWindowInstanceId(null);
            resolve();
        })

    }

    return (
        <SystemContext.Provider
            value={{
                windows,
                activeWallpaperId,
                activeWindowInstanceId,
                highlightColour,
                volume,
                isMuted,
                handleSetIsMuted,
                handleSetVolume,
                handleSetHighlightColour,
                handleSetWindowStatus,
                handleSetWindowPosition,
                handleSetActiveWallpaperId,
                handleSetActiveWindowInstanceId,
                handleOpenWindow,
                handleCloseWindow,
                clearAllWindows,
                restoreSave
            }}
        >
            {children}
        </SystemContext.Provider>
    )

}
