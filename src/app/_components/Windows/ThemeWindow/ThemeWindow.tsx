import React, { useContext } from 'react';
import { Wallpaper } from './Wallpaper/Wallpaper';
import { WindowActions } from '../WindowActions/WindowActions';
import { ThemeWindowContext, ThemeWindowContextProvider } from './context/ThemeWindowContext';
import { ColourPalette } from './ColourPalette/ColourPalette';
import { IWindowComponentProps } from '../../SystemContext/_static/windows/windows.types';
import { SystemContext } from '../../SystemContext/SystemContext';

/**
 * Window/application for managing the system theme
 * 
 * @param props.instanceId              instanceId of the parent window
 * @returns Component
 */
export const ThemeWindow = ({ instanceId }: IWindowComponentProps) => {

    return (
        <ThemeWindowContextProvider>
            <ThemeWindowContent instanceId={instanceId} />
        </ThemeWindowContextProvider>
    )

}

/**
 * Content for @see {ThemeWindow}
 * 
 * @param props.instanceId          instanceId of the parent window
 * @returns Component
 */
const ThemeWindowContent = ({ instanceId }: { instanceId: string }) => {
    
    // CONTEXT
    const { handleCloseWindow } = useContext(SystemContext);
    const { handleApplyTheme } = useContext(ThemeWindowContext);

    return (
        <div className='p-3 mb-12'>

            {/* CONTENT */}
            <div
                className='flex flex-col w-full h-full gap-4'
            >
                <Wallpaper />
                <ColourPalette />
            </div>
           

            {/* ACTIONS */}
            <WindowActions 
                actions={{
                    onApply: handleApplyTheme,
                    onCancel: () => handleCloseWindow(instanceId),
                    onOkay: () => {
                        handleApplyTheme();
                        handleCloseWindow(instanceId);
                    }
                }}
            />
        </div>
     
    )

}