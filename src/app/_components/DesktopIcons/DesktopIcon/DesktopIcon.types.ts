import { ReactNode } from "react";
import { windowIdEnum } from "../../SystemContext/_static/windows/windows.types";

/**
 * @interface
 * 
 * @member id               ID of the desktop Icon
 * @member windowId         ID of the window within the window ID enum
 * @member title            Title/name to be displayed beneath the icon
 * @member icon             Icon image            
 */
export interface IDesktopIcon{
    id: string;
    windowId: windowIdEnum,
    title: string;
    icon: ReactNode;
}

export type IDesktopIconProps = IDesktopIcon