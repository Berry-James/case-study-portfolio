import { wallpaperIdEnum } from "../_static/theme/theme.types";
import { WindowDict } from "../_static/windows/windows.types";

/**
 * @interface
 * 
 * @member windows                      Dictionary of current windows
 * @member activeWallpaperId            ID of the active wallpaper
 * @member activeWindowInstanceId       Store the ID of the currently active window
 * @member highlightColour              Chosen highlight colour
 */
export interface ISave {
    windows?: WindowDict;
    activeWallpaperId?: wallpaperIdEnum;
    activeWindowInstanceId?: string | null;
    highlightColour?: string | null;
}

/**
 * @interface
 * 
 * @member save         Up to date system state
 */
export interface IUseSave {
    save: ISave;
}

/**
 * @interface
 * 
 * @member disableSaving            If true, saving will be disabled.  This won't clear the current save
 */
export interface UseSaveOptions {
    disableSaving?: boolean
}