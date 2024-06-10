import React, { useContext, useState } from 'react';
import Styles from './TaskbarStartMenu.module.css';
import { TaskbarStartMenuApps } from './TaskbarStartMenuApps/TaskbarStartMenuApps';
import { TaskbarStartMenuContext, TaskbarStartMenuContextProvider } from './context/TaskbarStartMenuContext';

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
    const { isOpen, handleSetIsOpen } = useContext(TaskbarStartMenuContext);

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
            >
                Begin
            </button>

            {/* START MENU */}
            <div
                className={`${Styles.StartMenu} ${isOpen ? Styles.StartMenuOpen : undefined}`}
            >

                {/* GRADIENT SIDEBAR */}
                <div
                    className={Styles.StartMenuBranding}
                />

                {/* APPS LIST */}
                <div
                    className='p-2'
                >
                    <TaskbarStartMenuApps />
                </div>
            </div>
        </>
      
    )

}