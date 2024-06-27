import { ReactNode } from "react";
import { IWindow } from "../../SystemContext/_static/windows/windows.types";

/**
 * Props for Taskbar Item
 * incorporates props from IWIndow (excluding component)
 */
export type ITaskbarItemProps = Omit<IWindow, 'component'> & { icon: ReactNode };