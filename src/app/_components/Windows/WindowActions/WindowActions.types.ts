import { IWindowActions } from "../../SystemContext/_static/windows/windows.types";

/**
 * @interface
 * 
 * @member actions          Object containing any given actions, or undefined
 */
export interface IWindowActionsProps {
    actions: IWindowActions | undefined;
}