/**
 * @interface
 * 
 * @member isOpen               Is the start menu open?
 * @member handleSetIsOpen      Sets isOpen to the given value
 */
export interface ITaskbarStartMenuContext {
    isOpen: boolean;
    handleSetIsOpen: (newIsOpen: boolean) => void;
}