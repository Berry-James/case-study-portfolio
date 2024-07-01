/**
 * @interface
 * 
 * @member anchorEl         HTML element to attach tooltip to
 * @member position         (WIP) position to place tooltip in, relative to anchorEl
 * @member onClick          Event fired on tooltip click
 * @member open             If true, tooltip visible
 */
export interface ITooltipProps {
    anchorEl: HTMLElement | null;
    position?: TooltipPosition;
    onClick?: (e: React.MouseEvent<HTMLDivElement> | undefined) => unknown;
    open?: boolean
}

/**
 * Available positions for tooltip
 */
export type TooltipPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'