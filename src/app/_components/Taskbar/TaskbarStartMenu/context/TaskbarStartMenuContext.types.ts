/**
 * @interface
 * 
 * @member isOpen               Is the start menu open?
 * @member startMenuRef         Ref of the start menu item
 * @member startButtonRef       Ref of the start menu button
 * @member handleSetIsOpen      Sets isOpen to the given value
 */
export interface ITaskbarStartMenuContext {
    isOpen: boolean;
    startMenuRef: React.MutableRefObject<HTMLDivElement | null>;
    startButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
    handleSetIsOpen: (newIsOpen: boolean) => void;
}