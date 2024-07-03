import { ReactNode } from "react";
import { IWindow, WindowPosition, windowIdEnum } from "../../SystemContext/_static/windows/windows.types";

/**
 * @interface
 * @extends IWindow
 * 
 * @member id                        ID of the window being displayed in WINDOW_DICT
 * @member children                  Child components (the window itself)
 * @member title                     Title of the window
 * @member icon                      Icon to be displayed in window toolbar
 * @member defaultWindowPosition     Initial position of the window
 */
export interface IWindowWrapperProps extends IWindow {
    id: windowIdEnum;
    children: ReactNode;
    title: string;
    icon: ReactNode;
    defaultWindowPosition?: WindowPosition;
}