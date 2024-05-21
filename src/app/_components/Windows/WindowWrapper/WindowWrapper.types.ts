import { ReactNode } from "react";

export interface IWindowWrapperProps {
    id: string;
    children: ReactNode;
    title: string;
    icon: ReactNode;
}