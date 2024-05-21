import { ReactNode } from "react";

export interface IDesktopIcon{
    id: string;
    title: string;
    icon: ReactNode;
}

export type IDesktopIconProps = IDesktopIcon