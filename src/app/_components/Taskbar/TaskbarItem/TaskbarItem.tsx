'use client';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Styles from './TaskbarItem.module.css';
import { ITaskbarItemProps } from './TaskbarItem.types';
import { SystemContext } from '../../SystemContext/SystemContext';
import { windowStatusEnum } from '../../SystemContext/_static/windows/windows.types';

/**
 * An open/minimised window as displayed on the Taskbar
 * @implements {ITaskbarItemProps}
 * 
 * @param props.title           Title/name of the corresponding window  
 * @param props.icon            Icon of the corresponding window
 * @param props.status          Status of the corresponding window
 * @param props.instanceId      instanceID of the corresponding window
 * 
 * @returns Component
 */
export const TaskbarItem = ({ title, icon, status, instanceId }: ITaskbarItemProps) => {

    // CONTEXT
    const { handleSetWindowStatus, handleSetActiveWindowInstanceId, windows, activeWindowInstanceId } = useContext(SystemContext);

    // REFS

    /**
     * Store the previous status of the window in order to determine which animation to play
     */
    const previousStatus = useRef<windowStatusEnum | null>(null);

    /**
     * Ref to the div used to display the minimise/maximise animation
     */
    const animationDivRef = useRef<HTMLDivElement | null>(null);

    /**
     * Ref for the taskbar item/button
     */
    const taskbarButtonRef = useRef<HTMLButtonElement | null>(null);

    // COMPUTED
    /**
     * Determine if this is the active taskbar item
     */
    const isActiveTaskarItem = useMemo(() => activeWindowInstanceId === instanceId, [activeWindowInstanceId, instanceId])

    // HANDLERS
    /**
     * Callback used to update the status and set active window, depending on current window status
     */
    const handleClickTaskbarItem = async () => {

        let newStatus: windowStatusEnum = windowStatusEnum.open;

        switch(status) {
            case windowStatusEnum.open: {
                // if window open, and taskbar item is currently active, minimise it and clear active item
                if(isActiveTaskarItem) {
                    newStatus = windowStatusEnum.minimised;
                    handleSetActiveWindowInstanceId(null);
                    animateWindow(newStatus);
                } else {
                    // Otherwise, set to active window
                    handleSetActiveWindowInstanceId(instanceId);
                }
                break;
            }
            case windowStatusEnum.closed:
            case windowStatusEnum.minimised: {
                // If closed or minimised, set status to open and set to active window
                newStatus = windowStatusEnum.open;
                handleSetActiveWindowInstanceId(instanceId);
                await animateWindow(newStatus);
                break;
            }
        }

        // Finally, update the window status in SystemContext
        handleSetWindowStatus(instanceId, newStatus);

    }

    /**
     * Displays an animation, depicting the window opening
     * @alpha
     * @todo -> rewrite this but with class toggles instead (this is just for POC)
     * 
     * @returns void
     */
    const animateWindow = async (newStatus: windowStatusEnum): Promise<void> => {

        return new Promise((resolve, reject) => {

            // Find corresponding window for taskbar item
            const correspondingWindow = windows[instanceId];

            if(
                !animationDivRef?.current ||
                !taskbarButtonRef?.current ||
                !correspondingWindow
            ) {
                reject();
                return;
            }

            animationDivRef.current.style.display = 'block';
            animationDivRef.current.style.position = 'fixed';
            animationDivRef.current.style.transition = '.5s';
            animationDivRef.current.style.border = '2px solid'

            animationDivRef.current.style.top = `${correspondingWindow.position.y}px`;
            animationDivRef.current.style.left = `${correspondingWindow.position.x}px`;
            animationDivRef.current.style.width = `${correspondingWindow.position.w}px`;
            animationDivRef.current.style.height = `${correspondingWindow.position.h}px`;

            const animation = animationDivRef.current.animate(
                [
                    { 
                        top: `${correspondingWindow.position.y}px`,
                        left: `${correspondingWindow.position.x}px`,
                        width: `${correspondingWindow.position.w}px`,
                        height: `${correspondingWindow.position.h}px`
                    },
                    { 
                        top: `${taskbarButtonRef.current.getBoundingClientRect().top}px`,
                        left: `${taskbarButtonRef.current.getBoundingClientRect().left}px`,
                        width: `${taskbarButtonRef.current.offsetWidth}px`,
                        height: `${taskbarButtonRef.current.offsetHeight}px`
                    }
                ], 
                {
                    duration: 200,
                    direction: newStatus === windowStatusEnum.open ? 'reverse' : 'normal'
                }
                
            )
            
            animation.onfinish = () => {
                if(animationDivRef.current) {
                    animationDivRef.current.style.display = 'none';
                }
                resolve();
            }

        });

    }

    /**
     * Animate window open/close whenever status updates.
     * This is used to still trigger an animation to occur when a window is minimised via
     * the button on its toolbar
     */
    useEffect(() => {
        
        // If window has status (which is NOT minimised), and is trying to be minimised
        if(
            previousStatus.current !== null && 
            previousStatus.current !== windowStatusEnum.minimised &&
            status === windowStatusEnum.minimised
        ) {
            animateWindow(status);
        }

        // update previous status
        previousStatus.current = status;

    }, [status]);

    return (
        <>
            {/* ANIMATION DIV */}
            <div ref={animationDivRef} />

            {/* TASKBAR ITEM */}
            <button
                onClick={handleClickTaskbarItem}
                className={`${Styles.TaskbarItem} ${isActiveTaskarItem ? Styles.TaskbarItemActive : undefined}`}
                ref={taskbarButtonRef}
            >

                {/* ICON */}
                <div className={'w-4 h-4'}>
                    {icon}
                </div>

                {/* WINDOW NAME */}
                <span className='leading-none overflow-hidden text-ellipsis whitespace-nowrap'>{title}</span>
                
            </button>
        </>
       
    )

}