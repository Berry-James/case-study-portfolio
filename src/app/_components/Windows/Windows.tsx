import React, { useContext, useEffect } from 'react';
import { TaskbarContext } from '../Taskbar/context/TaskbarContext';
import { windowStatusEnum } from '../Taskbar/context/TaskbarContext.types';
import { WindowWrapper } from './WindowWrapper/WindowWrapper';

export const Windows = () => {

    // CONTEXT
    const { windows } = useContext(TaskbarContext);

    useEffect(() => console.log('wind', windows), [windows]);

    return Object.values(windows).map(window => {

            return (
                <WindowWrapper id={window.id} key={window.id} title={window.title} icon={window.icon}>
                    {window.component}
                </WindowWrapper>
            )
        
        
    })

}