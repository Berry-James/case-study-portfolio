import React, { useContext } from 'react';
import Styles from './TaskbarItem.module.css';
import { ITaskbarItemProps } from './TaskbarItem.types';
import { TaskbarContext } from '../context/TaskbarContext';
import { windowStatusEnum } from '../context/TaskbarContext.types';

export const TaskbarItem = ({ id, title, icon, status }: ITaskbarItemProps) => {

    const { handleSetWindowStatus } = useContext(TaskbarContext);

    const handleClickTaskbarItem = () => {

        let newStatus: windowStatusEnum = windowStatusEnum.open;

        switch(status) {
            case windowStatusEnum.open: {
                newStatus = windowStatusEnum.minimised;
                break;
            }
            case windowStatusEnum.closed:
            case windowStatusEnum.minimised: {
                newStatus = windowStatusEnum.open;
                break;
            }
        }

        handleSetWindowStatus(id, newStatus);

    }

    return (
        <button
            onClick={handleClickTaskbarItem}
            className={Styles.TaskbarItem}
        >
            {icon}
            <span>{title    }</span>
        </button>
       
    )

}