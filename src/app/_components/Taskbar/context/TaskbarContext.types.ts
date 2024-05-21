import { ReactNode } from "react";

export interface ITaskbarContext {
    windows: WindowDict;
    handleSetWindowStatus: (id: string, newStatus: windowStatusEnum) => void;
}

export type WindowDict = { [id: string]: IWindow };

export interface ITaskbarContextProviderProps {
    children: ReactNode;
}

export interface IWindow {
    id: string;
    title: string;
    component: ReactNode;
    icon: ReactNode;
    status: windowStatusEnum;
    location: {
        x: number;
        y: number;
    }
}

export enum windowStatusEnum {
    open,
    minimised,
    closed
}