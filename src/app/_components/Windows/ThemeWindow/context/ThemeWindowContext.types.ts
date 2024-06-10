import { wallpaperIdEnum } from "@/app/_components/SystemContext/_static/theme/theme.types";

/**
 * @interface
 * 
 * @member selectedWallpaperId                  ID of the currently selected wallpaper within the window
 * @member selectedHighlightColour              ID of the currently selected highlight colour within the window
 * @member handleSetSelectedHighlightColour     Updates the selectedHighlightColour state to the given value
 * @member handleSetSelectedWallpaper           Updates the selectedWallpaperId state to the given value
 * @member handleApplyTheme                     Applies the changes and updates state in SystemContext
 */
export interface IThemeWindowContext {
    selectedWallpaperId: wallpaperIdEnum,
    selectedHighlightColour: string;
    handleSetSelectedHighlightColour: (newSelectedHighlightColour: string) => void;
    handleSetSelectedWallpaper: (newSelectedWallpaperId: wallpaperIdEnum) => void;
    handleApplyTheme: () => void;
}