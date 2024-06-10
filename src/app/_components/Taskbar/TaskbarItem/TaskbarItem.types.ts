import { ReactNode } from "react";
import { IWindow } from "../../SystemContext/_static/windows/windows.types";

export type ITaskbarItemProps = Omit<IWindow, 'component'> & { icon: ReactNode };