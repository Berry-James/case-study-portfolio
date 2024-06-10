import React from 'react';
import { INotepadWindowProps } from './NotepadWindow.types';

/**
 * WIP notepad
 * @alpha
 * 
 * @param propsinstanceId               instanceId of the parent window 
 * @returns 
 */
export const NotepadWindow = ({ instanceId }: INotepadWindowProps) => {

    return (
        <div className='w-full h-full p-1'>
            <textarea className='w-full h-full resize-none'/>
        </div>
    )

}