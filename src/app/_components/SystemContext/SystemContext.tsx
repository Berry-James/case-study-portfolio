'use client';
import React, { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react';
import { ISystemContext, ISystemContextProviderProps } from './SystemContext.types';
import { wallpaperIdEnum } from './_static/theme/theme.types';
import { IWindow, IWindowTemplate, WindowPosition, windowIdEnum, windowStatusEnum } from './_static/windows/windows.types';
import { useSave } from './hooks/useSave';
import { WINDOWS_DICT } from './_static/windows/windows.static';
import { v4 as uuid } from 'uuid';
import { SYSTEM_HIGHLIGHT_COLOURS } from './_static/theme/theme.static';
import { formatVolume } from '@/utils/audioUtils';
import { TASKBAR_HEIGHT } from '../Taskbar/Taskbar';

/**
 * Top level functional context for the site
 * 
 * Handles the following:
 * - Saving/Loading window state
 * - System Theme
 * - Window posiitons and active/inactive states
 * - System volume
 * 
 * @implements {ISystemContext}
 * 
 * @returns Context
 * 
 */
export const SystemContext = createContext<ISystemContext>({
    windows: {},
    activeWallpaperId: wallpaperIdEnum.clouds,
    activeWindowInstanceId: null,                
    highlightColour: SYSTEM_HIGHLIGHT_COLOURS[0],
    volume: .8,
    isMuted: false,
    isMobile: false,
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

/**
 * Provider for the SystemContext
 * @see SystemContext
 * 
 * @param props.children        Child components
 * @param props.initialState    (alpha) Customise the initial state of the system based on server props
 *                              This will eventually be used to fetch the system state remotely in order to avoid any
 *                              pop in of windows or theming 
 * 
 * @returns Component
 */
export const SystemContextProvider = ({ children, initialState }: ISystemContextProviderProps) => {

    // STATE

    /**
     * Dictionary of all windows/applications which are currently open
     */
    const [windows, setWindows] = useState<Record<string, IWindow>>({});

    /**
     * Store the ID of the active wallpaper
     */
    const [activeWallpaperId, setActiveWallpaperId] = useState<wallpaperIdEnum>(wallpaperIdEnum.clouds);

    /**
     * Store the instance ID of the active (top visible) window
     */
    const [activeWindowInstanceId, setActiveWindowInstanceId] = useState<string | null>(null);

    /**
     * Store the highlight colour (window toolbars/system toolbar items)
     */
    const [highlightColour, setHighlightColour] = useState<string>(SYSTEM_HIGHLIGHT_COLOURS[0]);

    // Audio
    /**
     * System volume, 1 = 100%
     */
    const [volume, setVolume] = useState(.8);

    /**
     * System muted state
     */
    const [isMuted, setIsMuted] = useState(false);

    // HOOKS
    /**
     * Returns the system save, and handles updating save in local storage
     */
    const legacySave = useSave({
        windows, 
        activeWallpaperId, 
        activeWindowInstanceId, 
        highlightColour
    });

    /**
     * Listen for highlight colour change and update system CSS variable
     */
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--highlight', highlightColour)
    }, [highlightColour]);

    /**
     * Restores the save in the system from the value of legacySave
     * This should be called whenever the save is to be restored (i.e. main desktop),
     * but not when the save should be ignored (i.e. login page)
     */
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

    /**
     * Updates the system volume based on given value
     * Works with string/number values
     * 
     * @param newVolume             New volume, where 1 = 100%
     */
    const handleSetVolume = (newVolume: number | string) => {

        // Format and validate volume
        const parsedVolume = formatVolume(newVolume);
        if(parsedVolume) {
            setVolume(parsedVolume) 
        }
    }

    /**
     * Update system volume muted state
     * 
     * @param newIsMuted            New muted state
     * @returns void
     */
    const handleSetIsMuted = (newIsMuted: boolean) => setIsMuted(newIsMuted);

    /**
     * Update system highlight colour
     * Accepts any string, but should be an rgb colour
     * i.e. '23, 12, 45'
     * 
     * @param newHighlightColour            New highlight colour state
     * @returns void
     */
    const handleSetHighlightColour = useCallback((newHighlightColour: string) => setHighlightColour(newHighlightColour), []);

    /**
     * Handles opening a window and setting it to active.
     * If window already in windows state, set it to open and focussed
     * Otherwise, add it to windows state, set it to open and and set it to focussed
     * 
     * @param id                    ID of window in window dictionary to be opened
     * @param windowOverride        Custom props to inject the window with
     *                              For example, the document window can be pre-loaded with a document ID
     *                              on load
     * @returns new instanceId for window
     */
    const handleOpenWindow = (id: windowIdEnum, windowOverride?: Partial<IWindowTemplate>) => {

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

    /**
     * Close an open window by its instanceId
     * Removes specified window from windows state
     * 
     * @param instanceId 
     */
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

    /**
     * Update the status of a window (open, mininised, closed)
     * 
     * @param instanceId            Instance ID of the window to be updated
     * @param newStatus             New window status value
     * 
     * @returns void
     */
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
                // if closing window, remove window from windows array
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
     * @param instanceId            Instance ID of the window to be updated
     * @param newPos                Position of the window (x, y, z)
     * 
     * @returns void
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

    /**
     * Sets the window with the given instanceId to 'active'
     * 
     * @param instanceId            Instance ID of window to be set to active
     * 
     * @returns void
     */
    const handleSetActiveWindowInstanceId = (instanceId: string | null) => setActiveWindowInstanceId(instanceId);

    /**
     * Sets the active wallpaper ID to the given wallpaperId
     * 
     * @param newActiveWallpaperId              New wallpaper ID to be set
     * @returns void
     */
    const handleSetActiveWallpaperId = (newActiveWallpaperId: number) => setActiveWallpaperId(newActiveWallpaperId);

    /**
     * A promise which closes all open windows.
     * Sets windows state to empty object
     * 
     * @returns A promise resolving to void
     */
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
                isMobile: initialState.isMobile,
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
