'use client';
import React, { useContext, useMemo } from 'react';
import { IWindowTemplate } from '@/app/_components/SystemContext/_static/windows/windows.types';
import { WINDOWS_COMPONENT_MAP, WINDOWS_DICT } from '@/app/_components/SystemContext/_static/windows/windows.static';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';
import { TaskbarStartMenuContext } from '../context/TaskbarStartMenuContext';
import Styles from './TaskbarStartMenuApps.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PAGE_ROUTES } from '@/network/pageRoutes';

// ICONS
import LogOutIcon from '../../../../_static/icons/png/key_win-4.png'

/**
 * List of all system applications to be displayed in the @see {TaskbarStartMenu}
 * 
 * @returns Component
 */
export const TaskbarStartMenuApps = () => {

    // ROUTER
    const router = useRouter();

    // COMPUTED
    /**
     * Computes a list of all applications from WINDOWS_DICT static value
     */
    const computedApplicationsList = useMemo(() => {
        return Object.values(WINDOWS_DICT).map((windowItem, windowItemIndex) => {
            if(windowItem.rules.disableStartMenuShortcut) { return null }
            return <TaskbarStartMenuApp key={windowItem?.id} windowItem={windowItem}  />
        });
    }, []);

    const handleLogOut = () => {
        router.push(PAGE_ROUTES.login);
    }

    return (
        <div className='flex flex-col justify-between'>
            {/* APPLICATION MENU */}
            <ul className='w-full'>
                {computedApplicationsList}
            </ul>

            {/* SYSTEM ACTIONS */}
            <ul className='w-full'>

                {/* DIVIDER */}
                <hr className='win-bezel-inverted h-[2px]' style={{ color: 'unset' }}/>
                
                {/* SIGN OUT BUTTON */}
                {/* <li className={`w-full ${Styles.MenuItem}`}>
                    <button
                        className='w-full flex items-center justify-start gap-4 px-1 py-2 mb-2'
                        onClick={handleLogOut}    
                    >
                        <div className='w-6 h-6'>
                            <Image 
                                src={LogOutIcon}
                                width={24}
                                height={24}
                                alt={''}
                            />
                        </div>
                        Sign Out
                    </button>
                </li> */}
            </ul>
            
        </div>
      
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
        <li className={`w-full ${Styles.MenuItem}`}>
            <button
                className='w-full flex items-center justify-start gap-4 px-1 py-2 mb-2'
                onClick={handleClickApp}    
            >
                <div className='w-6 h-6'>
                    { appComponents.icon }
                </div>
                { windowItem.title }
            </button>
        </li>
      
    )

}