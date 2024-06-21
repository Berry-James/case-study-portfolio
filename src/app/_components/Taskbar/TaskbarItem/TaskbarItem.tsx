'use client';
import React, { useContext, useMemo, useRef, useState } from 'react';
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

    // STATE
    const [isAnimating, setIsAnimating] = useState(false);

    // CONTEXT
    const { handleSetWindowStatus, handleSetActiveWindowInstanceId, windows, activeWindowInstanceId } = useContext(SystemContext);

    // REFS
    const animationDivRef = useRef<HTMLDivElement | null>(null);
    const taskbarButtonRef = useRef<HTMLButtonElement | null>(null);

    // COMPUTED
    const isActiveTaskarItem = useMemo(() => activeWindowInstanceId === instanceId, [activeWindowInstanceId, instanceId])

    // HANDLERS
    /**
     * Callback used to update the status and set active window, depending on current window status
     */
    const handleClickTaskbarItem = async () => {

        let newStatus: windowStatusEnum = windowStatusEnum.open;

        switch(status) {
            case windowStatusEnum.open: {
                if(isActiveTaskarItem) {
                    newStatus = windowStatusEnum.minimised;
                    handleSetActiveWindowInstanceId(null);
                } else {
                    // await animateWindowClose();
                    handleSetActiveWindowInstanceId(instanceId);
                }
                animateWindow(newStatus);
                break;
            }
            case windowStatusEnum.closed:
            case windowStatusEnum.minimised: {
                newStatus = windowStatusEnum.open;
                await animateWindow(newStatus);
                handleSetActiveWindowInstanceId(instanceId);
                break;
            }
        }

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


    return (
        <>
            <div ref={animationDivRef} />
            <button
                onClick={handleClickTaskbarItem}
                className={`${Styles.TaskbarItem} ${isActiveTaskarItem ? Styles.TaskbarItemActive : undefined}`}
                ref={taskbarButtonRef}
            >
                <div className={'w-6 h-full'}>
                    {icon}
                </div>
                <span>{title}</span>
            </button>
        </>
       
       
    )

}