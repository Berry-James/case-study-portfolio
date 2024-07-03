/**
 * @interface
 * 
 * @member selectedDesktopItem              ID of the currently selected Desktop Item
 * @member handleSetSelectedDesktopItem     Function for setting the selectedDesktopItem state to the given value
 */
export interface IDesktopIconsContext {
    selectedDesktopItem: string | null;
    handleSetSelectedDesktopItem: (newSelectedDesktopItem: string | null) => void;
}