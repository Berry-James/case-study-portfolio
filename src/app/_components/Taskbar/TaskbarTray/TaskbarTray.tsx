import React from 'react';
import { TaskbarClock } from '../TaskbarClock/TaskbarClock';
import Styles from './TaskbarTray.module.css';
import { TaskbarVolume } from '../TaskbarVolume/TaskbarVolume';

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
            <TaskbarVolume />
            <TaskbarClock />
        </div>
    )

}