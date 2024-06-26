'use client';
import React, { useContext } from 'react';
import Styles from './Taskbar.module.css';
import { TaskbarItem } from './TaskbarItem/TaskbarItem';
import { TaskbarStartMenu } from './TaskbarStartMenu/TaskbarStartMenu';
import { SystemContext } from '../SystemContext/SystemContext';
import { WINDOWS_COMPONENT_MAP } from '../SystemContext/_static/windows/windows.static';
import { TaskbarTray } from './TaskbarTray/TaskbarTray';

// Define a static tasbkar height for making sizing calulations in other components
export const TASKBAR_HEIGHT = 32;

/**
 * Taskbar component, displayed at the bottom of the page and displays all open/minimsed apps
 * As well as Start button and system tray
 * 
 * @returns Component
 */
export const Taskbar = () => {
    
    // CONTEXT
    const { windows } = useContext(SystemContext);

    return (
        <div 
            className={Styles.Taskbar}
            style={{
                height: `${TASKBAR_HEIGHT}px`
            }}
        >
            <div className='flex items-center gap-1 h-full'>
                
                {/* START BUTTON */}
                <TaskbarStartMenu />

                {/* DIVIDER */}
                <div className={Styles.TaskbarDivider} />

                {/* TASKBAR ITEMS */}
                {
                    Object.values(windows).map(windowItem => {

                        // Determine matching component (for icon)
                        const components = WINDOWS_COMPONENT_MAP[windowItem.id]({
                            instanceId: windowItem.instanceId,
                            ...windowItem.componentProps
                        });

                        return (
                            <TaskbarItem 
                                {...windowItem}
                                key={windowItem.instanceId}
                                icon={components.icon}
                            />
                        )
                        
                    })
                }
            </div>
           
            {/* TRAY */}
            <TaskbarTray />
        </div>
    )

}