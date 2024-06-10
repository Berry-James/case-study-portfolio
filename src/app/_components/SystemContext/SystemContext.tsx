'use client';
import React, { ChildContextProvider, PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import { ISystemContext } from './SystemContext.types';
import { wallpaperIdEnum } from './_static/theme/theme.types';
import { IWindow, IWindowTemplate, WindowDict, WindowPosition, windowIdEnum, windowStatusEnum } from './_static/windows/windows.types';
import { useSave } from './hooks/useSave';
import { WINDOWS_DICT } from './_static/windows/windows.static';
import { uuid } from 'uuidv4';
import { SYSTEM_HIGHLIGHT_COLOURS } from './_static/theme/theme.static';
import { TASKBAR_HEIGHT } from '../Taskbar/Taskbar';


export const SystemContext = createContext<ISystemContext>({
    windows: {},
    activeWallpaperId: wallpaperIdEnum.clouds,
    activeWindowInstanceId: null,                
    highlightColour: SYSTEM_HIGHLIGHT_COLOURS[0],
    volume: .8,
    handleSetVolume: (newVolume: number) => undefined,
    handleSetHighlightColour: (newHighlightColour: string) => undefined,
    handleSetWindowStatus: (instanceId: string, newStatus: windowStatusEnum) => undefined,
    handleSetWindowPosition: (instanceId: string, newPos: Partial<WindowPosition>) => undefined,
    handleSetActiveWallpaperId: (newActiveWallpaperId: number) => undefined,
    handleSetActiveWindowInstanceId: (instanceId: string) => undefined,
    handleOpenWindow: (id: windowIdEnum, windowOverride?: Partial<IWindowTemplate>) => '',
    handleCloseWindow: (instanceId: string) => undefined
});

export const SystemContextProvider = ({ children }: PropsWithChildren) => {

    // STATE
    const [windows, setWindows] = useState<Record<string, IWindow>>({});
    const [activeWallpaperId, setActiveWallpaperId] = useState<wallpaperIdEnum>(wallpaperIdEnum.clouds);
    const [activeWindowInstanceId, setActiveWindowInstanceId] = useState<string | null>(null);
    const [highlightColour, setHighlightColour] = useState<string>(SYSTEM_HIGHLIGHT_COLOURS[0]);
    const [volume, setVolume] = useState(.8);

    // HOOKS
    const legacySave = useSave({windows, activeWallpaperId, activeWindowInstanceId, highlightColour});

    // TODO -> refactor this into the useSave hook and treat it more like a redux store/reducer type vibe
    useEffect(() => {

        if(legacySave) {
            if(legacySave.activeWallpaperId !== undefined) {
                setActiveWallpaperId(legacySave.activeWallpaperId);
            }
            if(legacySave.activeWindowInstanceId !== undefined) {
                setActiveWindowInstanceId(legacySave.activeWindowInstanceId);
            } 
            if(legacySave.windows) {
                console.log('save.windows', legacySave.windows);
                setWindows(legacySave.windows);
            }
            if(legacySave.highlightColour) {
                setHighlightColour(legacySave.highlightColour)
            }
        } else {
            // No save, set some defaults

            // Calc window position
            const x = (window.innerWidth / 2) - (WINDOWS_DICT[windowIdEnum.portfolio].position.w / 2);
            const y = (window.innerHeight / 2) - (WINDOWS_DICT[windowIdEnum.portfolio].position.h / 2) - TASKBAR_HEIGHT;

            const instanceId = uuid();
            setWindows({
                [instanceId]: {
                    instanceId,
                    status: windowStatusEnum.open,
                    ...WINDOWS_DICT[windowIdEnum.portfolio],
                    position: {
                        ...WINDOWS_DICT[windowIdEnum.portfolio].position,
                        x,
                        y
                    }
                }
            });
            setActiveWindowInstanceId(instanceId);
        }
    }, [legacySave]);

    useEffect(() => {
        
        const root = document.documentElement;

        root.style.setProperty('--highlight', highlightColour)

    }, [highlightColour]);

    const handleSetVolume = (newVolume: number) => setVolume(newVolume);

    const handleSetHighlightColour = useCallback((newHighlightColour: string) => setHighlightColour(newHighlightColour), []);

    const handleOpenWindow = (id: windowIdEnum, windowOverride?: Partial<IWindowTemplate>) => {

        // If window template is 'solo'
        if(WINDOWS_DICT[id].solo) {

            // Find instance ID of window in windows state (if it exists)
            const existingWindow = Object.values(windows).find(existingWindow => existingWindow.id === id);

            console.log('existing Window', existingWindow);

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
                    ...windowOverride
                }
            }
        });

        // Make this the active window
        handleSetActiveWindowInstanceId(instanceId);

        return instanceId;

    }

    const handleCloseWindow = (instanceId: string) => {

        console.log('handleCloseWindow()', instanceId, windows);

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

        console.log('handleSetWindowPosition() -> windows', windows);

        setWindows((prevState) => {

            console.log('handleSetWindowPosition() -> prevState', prevState);

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

            console.log('handleSetWindowPosition() -> ret', ret);

            return ret;
        });

    }

    const handleSetActiveWindowInstanceId = (instanceId: string) => setActiveWindowInstanceId(instanceId);

    const handleSetActiveWallpaperId = (newActiveWallpaperId: number) => setActiveWallpaperId(newActiveWallpaperId);

    return (
        <SystemContext.Provider
            value={{
                windows,
                activeWallpaperId,
                activeWindowInstanceId,
                highlightColour,
                volume,
                handleSetVolume,
                handleSetHighlightColour,
                handleSetWindowStatus,
                handleSetWindowPosition,
                handleSetActiveWallpaperId,
                handleSetActiveWindowInstanceId,
                handleOpenWindow,
                handleCloseWindow
            }}
        >
            {children}
        </SystemContext.Provider>
    )

}

