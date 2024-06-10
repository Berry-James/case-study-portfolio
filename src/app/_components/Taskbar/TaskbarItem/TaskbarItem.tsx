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
                } else {
                    await animateWindowClose();
                    handleSetActiveWindowInstanceId(instanceId);
                }
                break;
            }
            case windowStatusEnum.closed:
            case windowStatusEnum.minimised: {
                newStatus = windowStatusEnum.open;
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
    const animateWindowClose = async (): Promise<void> => {

        return new Promise((resolve) => {



            // Find corresponding window for taskbar item
            const correspondingWindow = windows[instanceId];

            if(!animationDivRef?.current || !correspondingWindow) {
                resolve();
                return;
            }

            animationDivRef.current.style.transition = '.5s';
            animationDivRef.current.style.position = 'fixed';
            // animationDivRef.current.style.left = '0';
            // animationDivRef.current.style.top = '0';
            animationDivRef.current.style.border = '2px solid'
            animationDivRef.current.style.width = `${correspondingWindow.position.w}px`;
            animationDivRef.current.style.height = `${correspondingWindow.position.h}px`;
            animationDivRef.current.style.transform = `translate(${correspondingWindow.position.x}px, ${correspondingWindow.position.y}px)`;
        
            setTimeout(() => {
                if(animationDivRef?.current) {
                    animationDivRef.current.style.display = 'none';
                    resolve();
                }
              
            }, 600);

            // return;

        })

    }


    return (
        <>
            <div ref={animationDivRef} />
            <button
                onClick={handleClickTaskbarItem}
                className={`${Styles.TaskbarItem} ${isActiveTaskarItem ? Styles.TaskbarItemActive : undefined}`}
            >
                <div className={'w-6 h-full'}>
                    {icon}
                </div>
                <span>{title}</span>
            </button>
        </>
       
       
    )

}