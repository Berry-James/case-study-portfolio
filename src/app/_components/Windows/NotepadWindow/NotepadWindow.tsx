import React, { useContext } from 'react';
import { INotepadWindowProps } from './NotepadWindow.types';
import { NotepadWindowContext, NotepadWindowContextProvider } from './context/NotepadWindowContext';
import { NotepadWindowToolbar } from './NotepadWindowToolbar/NotepadWindowToolbar';

/**
 * Simple notepad window for making text documents
 * Able to download contents as .txt file
 * @alpha
 * TODO -> Add the following features:
 * TODO -> - FONT (size, typeface, color)
 * TODO -> - Save As
 * 
 * @param propsinstanceId               instanceId of the parent window 
 * @returns Component
 */
export const NotepadWindow = ({ instanceId }: INotepadWindowProps) => {

    return (
        <NotepadWindowContextProvider>
            <NotepadWindowContent />
        </NotepadWindowContextProvider>
    )

}

/**
 * Content for NotepadWindow Component
 * @see NotepadWindow
 * 
 * @returns Component
 */
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