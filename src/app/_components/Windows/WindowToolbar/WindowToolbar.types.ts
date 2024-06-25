export interface IWindowToolbarProps {
    items: WindowToolbarItem[];
}

export type WindowToolbarItem = {
    name: string;
    options?: WindowToolbarOption[];
}

export type WindowToolbarOption = {
    name: string;
    action: (e: React.MouseEvent<HTMLButtonElement>) => void;
}