'use client';
import React, { useContext } from 'react';
import Styles from './Taskbar.module.css';
import { TaskbarItem } from './TaskbarItem/TaskbarItem';
import { FaGithub } from 'react-icons/fa';
import { TaskbarContext } from './context/TaskbarContext';
import { TaskbarClock } from './TaskbarClock/TaskbarClock';

export const Taskbar = () => {
    
    const { windows } = useContext(TaskbarContext);

    return (
        <div className={Styles.Taskbar}>
            <div className='flex items-center gap-4 h-full'>
                <div className={Styles.TaskbarHomeButton}>
                    Cool OS
                </div>
                {
                    Object.values(windows).map((window, windowIndex) => (
                        <TaskbarItem 
                            id={window.id}
                            key={window.id}
                            location={window.location}
                            icon={<FaGithub />}
                            title={window.title}
                            status={window.status}
                        />
                    ))
                }
            </div>
           
            <TaskbarClock />
        </div>
    )

}