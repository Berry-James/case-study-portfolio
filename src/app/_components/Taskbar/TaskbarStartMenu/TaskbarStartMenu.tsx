'use client';
import React, { useContext } from 'react';
import Styles from './TaskbarStartMenu.module.css';
import { TaskbarStartMenuApps } from './TaskbarStartMenuApps/TaskbarStartMenuApps';
import { TaskbarStartMenuContext, TaskbarStartMenuContextProvider } from './context/TaskbarStartMenuContext';
import { isMobile } from 'react-device-detect';
import { SystemContext } from '../../SystemContext/SystemContext';
import Image from 'next/image';

// IMAGES
import Branding2Image from '../../../_static/imgs/branding-2.png';

/**
 * Start menu displayed on the Taskbar
 * Used to open any window/application in the system
 * 
 * @returns Component
 */
export const TaskbarStartMenu = () => {

    return (
        <TaskbarStartMenuContextProvider>
            <TaskbarStartMenuContent />
        </TaskbarStartMenuContextProvider>
    )

}

/**
 * Content for the @see {TaskbarStartMenu}
 * 
 * @returns Component
 */
const TaskbarStartMenuContent = () => {

    // CONTEXT
    const { isMobile } = useContext(SystemContext);
    const { isOpen, startMenuRef, startButtonRef, handleSetIsOpen } = useContext(TaskbarStartMenuContext);

    // HANDLERS
    /**
     * Opens the start menu
     * 
     * @returns void
     */
    const handleClickStartButton = () => handleSetIsOpen(!isOpen);

    return (
        <>
            {/* START BUTTON */}
            <button 
                className={'text-button w-12 h-full flex justify-center items-center'}
                onClick={handleClickStartButton}
                ref={startButtonRef}
                disabled={isMobile}
                style={{
                    pointerEvents: isMobile ? 'none' : 'unset'
                }}
            >
                Begin
            </button>

            {/* START MENU */}
            <div
                className={`${Styles.StartMenu} ${isOpen ? Styles.StartMenuOpen : undefined}`}
                ref={startMenuRef}
            >

                {/* GRADIENT SIDEBAR */}
                <div
                    className={Styles.StartMenuBranding}
                >
                    <Image src={Branding2Image} alt='' width={18} />
                </div>

                {/* APPS LIST */}
                <div
                    className='py-1'
                >
                    <TaskbarStartMenuApps />
                </div>
            </div>
        </>
      
    )

}