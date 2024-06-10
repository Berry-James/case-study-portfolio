import { ReactNode } from "react";

/**
 * @interface
 * 
 * @member instanceId               InstanceID of the window in the windows state
 * @member status                   Status of the window (open, closed, etc)
 */
export interface IWindow extends Omit<IWindowTemplate, 'solo'> {
    instanceId: string;
    status: windowStatusEnum;
}

/**
 * @interface
 * 
 * @member id               ID of the window in the windowIdEnum
 * @member title            Title of the window/application
 * @member position         Object containing starting position data for the window 
 * @member actions          (optional) Custom actions for the window
 * @member componentProps   Custom props to be passed to the component on mount
 * @member solo             If true, only one instance of this window can be visible at a time
 */
export interface IWindowTemplate {
    id: windowIdEnum;
    title: string;
    position: WindowPosition;
    actions?: IWindowActions;
    componentProps?: any
    solo: boolean;
}

/**
 * @interface
 * 
 * @member onApply          (optional) Callback for when 'apply' button is pressed
 * @member onOkay           (optional) Callback for when 'ok' button is pressed
 * @member onCancel         (optional) Callback for when 'cancel' button is pressed
 * @member custom           (optional) Array of completely independent components to render in the 'actions' bar
 */
export interface IWindowActions {
    onApply?: () => any;
    onOkay?: () => any;
    onCancel?: () => any;
    custom?: ReactNode[];
}

/**
 * @enum
 * 
 * @member open
 * @member minimised
 * @member closed
 */
export enum windowStatusEnum {
    open,
    minimised,
    closed
}

/**
 * @interface
 * 
 * @member x            X coord of the window
 * @member y            Y coord of the window
 * @member z            Z-index of the window
 * @member w            Width of the window
 * @member h            Height of the window
 */
export type WindowPosition = {
    x: number;
    y: number;
    z: number;
    w: number;
    h: number;
}

/**
 * @enum
 * 
 * @member portfolio
 * @member theme
 * @member notepad
 * @member document
 * @member musicPlayer
 */
export enum windowIdEnum {
    portfolio,
    theme,
    notepad,
    document,
    musicPlayer,
}

export type WindowDict = Partial<Record<windowIdEnum, IWindow>>;

export type IWindowComponentProps<T extends {} = {}> = {
    instanceId: string;
} & T