
/**
 * @interface
 * 
 * @member items            Array of toolbar items
 */
export interface IWindowToolbarProps {
    items: WindowToolbarItem[];
}

/**
 * @member name         Name of toolbar item (i.e. 'File')
 * @member options      (optional) Array of options to be contained within dropdown
 */
export type WindowToolbarItem = {
    name: string;
    options?: WindowToolbarOption[];
}

/**
 * @member name         Name of toolbar option
 * @member action       Callback to fire on item click
 */
export type WindowToolbarOption = {
    name: string;
    action: (e: React.MouseEvent<HTMLButtonElement>) => void;
}