import React from 'react';
import { TaskbarClock } from '../TaskbarClock/TaskbarClock';
import Styles from './TaskbarTray.module.css';
import { TaskbarVolume } from '../TaskbarVolume/TaskbarVolume';
import dynamic from 'next/dynamic';
import { TaskbarMobileWarning } from '../TaskbarMobileWarning/TaskbarMobileWarning';

// Make clock dynamic to avoid SSR conflicts with rendered HTML
const DynamicTaskbarClock = dynamic(() => import('../TaskbarClock/TaskbarClock').then(mod => mod.TaskbarClock), { ssr: false });

/**
 * Tray component displayed to the far right of the taskbar
 * 
 * @returns Component
 */
export const TaskbarTray = () => {

    return (
        <div
            className={Styles.TaskbarTray}
        >
            <TaskbarMobileWarning />
            <TaskbarVolume />
            <DynamicTaskbarClock />
        </div>
    )

}