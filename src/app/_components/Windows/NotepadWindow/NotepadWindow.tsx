import React, { useContext } from 'react';
import { INotepadWindowProps } from './NotepadWindow.types';
import { WindowToolbar } from '../WindowToolbar/WindowToolbar';
import { NotepadWindowContext, NotepadWindowContextProvider } from './context/NotepadWindowContext';
import { NotepadWindowToolbar } from './NotepadWindowToolbar/NotepadWindowToolbar';

/**
 * WIP notepad
 * @alpha
 * 
 * @param propsinstanceId               instanceId of the parent window 
 * @returns 
 */
export const NotepadWindow = ({ instanceId }: INotepadWindowProps) => {

    return (
        <NotepadWindowContextProvider>
            <NotepadWindowContent />
        </NotepadWindowContextProvider>
    )

}

const NotepadWindowContent = () => {

    // CONTEXT
    const { notepadRef } = useContext(NotepadWindowContext);

    return (
        <div className='flex flex-col h-full'>
            {/* TOOLBAR */}
            <NotepadWindowToolbar />

            {/* TEXT FIELD */}
            <div className='w-full h-full p-1'>
                <textarea 
                    className='w-full h-full resize-none'
                    ref={notepadRef}
                />
            </div>
        </div>
       
    )

}