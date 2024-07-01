'use client';
import React, { useCallback, useContext, useMemo } from 'react';
import { IDesktopIconProps } from './DesktopIcon.types';
import { DesktopIconsContext } from '../context/DesktopIconsContext';
import { windowStatusEnum } from '../../SystemContext/_static/windows/windows.types';
import { SystemContext } from '../../SystemContext/SystemContext';

/**
 * A singular desktop item
 * Displays an icon and a name, on double-click will open the chosen window
 * @implements {IDesktopIconProps}
 * 
 * @param props.id              ID of the Desktop Icon
 * @param props.title           Title/name to be displayed beneath the icon
 * @param props.icon            Icon image
 * @param props.windowId        ID of the window within the window ID enum
 * 
 * @returns Component
 */
export const DesktopIcon = ({ id, title, icon, windowId }: IDesktopIconProps) => {

    // CONTEXT
    const { windows, handleOpenWindow, handleSetActiveWindowInstanceId } = useContext(SystemContext);
    const { selectedDesktopItem, handleSetSelectedDesktopItem } = useContext(DesktopIconsContext);

    // HANDLERS

    /**
     * Opens the given window (by windowId props) on double-click of a DesktopIcon
     */
    const handleDoubleClickDesktopIcon = () => {
        if(
            !windows[windowId] || 
            windows[windowId]?.status !== windowStatusEnum.open
        ) {
            const instanceId = handleOpenWindow(windowId);
            handleSetActiveWindowInstanceId(instanceId);
        }
    }

    /**
     * Sets the current DesktopItem as selected in the parent context
     */
    const handleSingleClickDesktopIcon = useCallback(() => {
        handleSetSelectedDesktopItem(id);
    }, [id]);

    /**
     * Determine if the current DesktopItem is selected
     */
    const isSelected = useMemo(() => selectedDesktopItem === id, [selectedDesktopItem, id]);

    return (
        <button 
            className={`w-16 p-2 flex flex-col items-center justify-start cursor-default bg-inherit border border-dashed ${isSelected ? 'border-white' : 'border-transparent'}`}
            onDoubleClick={handleDoubleClickDesktopIcon}
            onMouseDown={handleSingleClickDesktopIcon}
        >

            {/* ICON */}
            <div className='w-8 h-8'>
                { icon } 
            </div>

            {/* WINDOW NAME */}
            <span 
                className='text-black'
                style={{
                    textShadow: '1px 2px #FFF'
                }}
            >
                { title }
            </span>
        </button>
    )

}