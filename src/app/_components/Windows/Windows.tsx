import React, { useContext, useEffect } from 'react';
import { WindowWrapper } from './WindowWrapper/WindowWrapper';
import { WINDOWS_COMPONENT_MAP } from '../SystemContext/_static/windows/windows.static';
import { SystemContext } from '../SystemContext/SystemContext';
import { windowIdEnum } from '../SystemContext/_static/windows/windows.types';

/**
 * Contains all window elements
 * 
 * @returns Component
 */
export const Windows = () => {

    // CONTEXT
    const { windows } = useContext(SystemContext);

    // Map through and return all windows
    return Object.values(windows).map(windowItem => {

        // Get component from component mapping
        const components = WINDOWS_COMPONENT_MAP[windowItem.id]({
            instanceId: windowItem.instanceId,
            ...windowItem.componentProps
        });

        return (
            <WindowWrapper 
                key={windowItem.instanceId} 
                {...windowItem}
                icon={components.icon}
                defaultWindowPosition={windowItem.position}
            >
                {components.component}
            </WindowWrapper>
        )
        
    })

}