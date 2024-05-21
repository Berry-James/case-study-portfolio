import React, { useContext } from 'react';
import Styles from './WindowWrapper.module.css';
import { IWindowWrapperProps } from './WindowWrapper.types';
import { TaskbarContext, TaskbarContextProvider } from '../../Taskbar/context/TaskbarContext';
import { windowStatusEnum } from '../../Taskbar/context/TaskbarContext.types';

export const WindowWrapper = ({ id, children, title, icon }: IWindowWrapperProps) => {

    const { windows, handleSetWindowStatus } = useContext(TaskbarContext);

    console.log(windows[id]);

    if(windows[id]?.status !== windowStatusEnum.open) {
        return null;
    }

    const handleClickCloseButton = () => handleSetWindowStatus(id, windowStatusEnum.closed);

    const handleClickMinimiseButton = () => handleSetWindowStatus(id, windowStatusEnum.minimised);

    return (
        <div className={`${Styles.WindowWrapper} animate-flip-up`}>
            <div className='flex gap-4 items-center justify-between mb-4 bg-slate-400 px-2 py-1'>
                <div className='flex gap-4 items-center'>
                    { icon }
                    <span>{ title }</span>
                </div>
               
                <div className='flex gap-2 items-center'>

                    {/* MINIMISE BUTTON */}
                    <button 
                        onClick={handleClickMinimiseButton}
                        className={Styles.Button}
                    >
                        _
                    </button>

                    {/* CLOSE BUTTON */}
                    <button 
                        onClick={handleClickCloseButton}
                        className={Styles.Button}
                    >
                        &times;
                    </button>
                </div>
              
            </div>
            { children }
        </div>
    )

}