import { PropsWithChildren } from "react";
import { wallpaperIdEnum } from "./_static/theme/theme.types";
import { IWindow, IWindowTemplate, WindowDict, WindowPosition, windowIdEnum, windowStatusEnum } from "./_static/windows/windows.types";

/**
 * @interface
 * 
 * @member windows                              Object with all current windows
 * @member activeWallpaperId                    ID of currently active system wallpaper
 * @member activeWindowInstanceId               Instance ID of currently active/top window
 * @member highlightColour                      System highlight colour as RGB string ('23, 45, 12')
 * @member volume                               System volume, where 1 = 100%
 * @member isMuted                              System volume muted state
 * @member isMobile                             If site running on mobile device, set to true
 * @member handleSetIsMuted                     Update system muted state to given value
 * @member handleSetVolume                      Updates system volume to given value
 * @member handleSetHighlightColour             Updates system highlight colour to given value (rgb string)
 * @member handleSetWindowStatus                Updates a windows status
 * @member handleSetWindowPosition              Updates window position to given values (x,y and w,h)
 * @member handleSetActiveWallpaperId           Updates active wallpaper ID to given value
 * @member handleSetActiveWindowInstanceId      Sets given window to active
 * @member handleOpenWindow                     Opens the given window, or sets it to visible and active if already open
 * @member handleCloseWindow                    Closes the given window
 * @member clearAllWindows                      Close all windows, opened or minimised
 * @member restoreSave                          Restores the system saved based on the current value of legacySave
 */
export interface ISystemContext {
    windows: Record<string, IWindow>;
    activeWallpaperId: wallpaperIdEnum;
    activeWindowInstanceId: string | null;
    highlightColour: string;
    volume: number;
    isMuted: boolean;
    isMobile: boolean;
    handleSetIsMuted: (newIsMuted: boolean) => void;
    handleSetVolume: (newVolume: number) => void;
    handleSetHighlightColour: (newHighlightColour: string) => void;
    handleSetWindowStatus: (instanceId: string, newStatus: windowStatusEnum) => void;
    handleSetWindowPosition: (instanceId: string, newPos: Partial<WindowPosition>) => void;
    handleSetActiveWallpaperId: (newActiveWallpaperId: wallpaperIdEnum) => void;
    handleSetActiveWindowInstanceId: (instanceId: string | null) => void;
    handleOpenWindow: (id: windowIdEnum, windowOverride?: Partial<IWindowTemplate>) => string;
    handleCloseWindow: (instanceId: string) => void;
    clearAllWindows: () => Promise<void>;
    restoreSave: () => void;
}

/**
 * @member initialState             (alpha) Initialise the system state by the given value
 *                                  Designed for use with server rendering to pre-render the system
 *                                  With the correct state.
 */
export type ISystemContextProviderProps = PropsWithChildren<{
    initialState: {
        isMobile: boolean;
    }
}>
