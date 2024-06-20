'use client';
import React, { useContext, useMemo } from 'react';
import { IWindowTemplate } from '@/app/_components/SystemContext/_static/windows/windows.types';
import { WINDOWS_COMPONENT_MAP, WINDOWS_DICT } from '@/app/_components/SystemContext/_static/windows/windows.static';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';
import { TaskbarStartMenuContext } from '../context/TaskbarStartMenuContext';

/**
 * List of all system applications to be displayed in the @see {TaskbarStartMenu}
 * 
 * @returns Component
 */
export const TaskbarStartMenuApps = () => {

    // COMPUTED
    /**
     * Computes a list of all applications from WINDOWS_DICT static value
     */
    const computedApplicationsList = useMemo(() => {
        return Object.values(WINDOWS_DICT).map((windowItem, windowItemIndex) => {
            return <TaskbarStartMenuApp key={windowItem?.id} windowItem={windowItem}  />
        });
    }, []);

    return (
        <ul className='w-full'>
            {computedApplicationsList}
        </ul>
    )

}

/**
 * Individual app to be displayed in the start menu
 * 
 * @param props.windowItem          The full window template item for the given window
 * @returns Component
 */
const TaskbarStartMenuApp = ({ windowItem }: { windowItem: IWindowTemplate }) => {

    // CONTEXT
    const { handleOpenWindow } = useContext(SystemContext);
    const { handleSetIsOpen } = useContext(TaskbarStartMenuContext);
    
    // HANDLERS
    /**
     * Callback that fires when an app is clicked on
     */
    const handleClickApp = () => {
        handleOpenWindow(windowItem.id);
        handleSetIsOpen(false);
    }

    /**
     * Computes the icon of the given windowItem
     */
    const appComponents = useMemo(() => {

        const components = WINDOWS_COMPONENT_MAP[windowItem.id]({
            ...windowItem.componentProps
        });

        return components;

    }, [windowItem]);

    return (
        <li className='w-full mb-2'>
            <button
                className='w-full flex items-center justify-start gap-2 px-1'
                onClick={handleClickApp}    
            >
                { appComponents.icon }
                { windowItem.title }
            </button>
        </li>
      
    )

}