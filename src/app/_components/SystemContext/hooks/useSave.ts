'use client';
import { useEffect, useMemo, useState } from "react"
import { ISave, UseSaveOptions } from "./useSave.types";
import { IWindow, windowIdEnum, windowStatusEnum } from "../_static/windows/windows.types";
import { WINDOWS_DICT } from "../_static/windows/windows.static";
import { v4 as uuid } from 'uuid';

/**
 * Static local storage key name
 */
const LOCAL_STORAGE_SAVE_KEY = 'save';

/**
 * Hook which handles automatically saving specificed system values to localStorage
 * 
 * @param args          The system state to be stored
 * 
 * @returns The up to date save
 */
export const useSave = (args: ISave, options?: UseSaveOptions): ISave | null => {

    // STATE
    /**
     * Used to prevent save from immediately running on first mount
     */
    const [init, setInit] = useState(true);

    /**
     * Update the save (if not init)
     */
    useEffect(() => {
        if(init) {
            return setInit(false);
        }
        if(!options?.disableSaving && args) {
            saveSession(args);
        }
    }, [args, options?.disableSaving]);

    return useMemo(() => getSaveSession(), []);

}

/**
 * Saves the given session to localStorage
 * 
 * @param save          The up to date session
 */
function saveSession(save: ISave): void {
    if(typeof window !== 'undefined') {
        window.localStorage.setItem(LOCAL_STORAGE_SAVE_KEY, JSON.stringify(save));
    }
}

/**
 * Gets the up to date save from localStorage and returns it
 * 
 * @returns save from localStorage
 */
export function getSaveSession(): ISave | null {
    
    if(typeof window === 'undefined') {
        return null;
    }

    const save = window.localStorage.getItem(LOCAL_STORAGE_SAVE_KEY);

    if(!save) {
        return null
    }

    const parsed: ISave = JSON.parse(save);

    let formattedWindows: Record<string, IWindow> = {};

    // If windows were found in localStorage, format them
    if(parsed?.windows) {

        Object.values(parsed.windows).forEach((localStorageWindow) => {

            // If failed to find window in enum, or in WINDOWS_DICT, don't add it
            if(
                !windowIdEnum[localStorageWindow.id] ||
                !WINDOWS_DICT[localStorageWindow.id]
            ) {
                return
            }

            formattedWindows[localStorageWindow.instanceId] = {
                ...localStorageWindow,
                position: {
                    // Inject initial position from WINDOWS_DICT, just in case some values are missing
                    ...WINDOWS_DICT[localStorageWindow.id]?.position,
                    ...localStorageWindow.position
                }
            }

        })

    } 
    // Oherwise, create a new save with the portfolio window open by default
    else {

        const instanceId = uuid();

        formattedWindows = {
            [instanceId]: {
                instanceId,
                ...WINDOWS_DICT[windowIdEnum.portfolio],
                status: windowStatusEnum.open
            }
        }
    }

    return {
        ...parsed,
        windows: formattedWindows
    };

}
