import React, { useContext } from 'react';
import { WindowToolbar } from '../../WindowToolbar/WindowToolbar';
import { NotepadWindowContext } from '../context/NotepadWindowContext';

/**
 * Window toolbar for the Notepad window
 * Contains Save button
 * 
 * @returns Component
 */
export const NotepadWindowToolbar = () => {

    // CONTEXT
    const { downloadAsTextFile } = useContext(NotepadWindowContext);

    return (
        <WindowToolbar 
            items={[
                {
                    name: 'File',
                    options: [
                        {
                            name: 'Save',
                            action: downloadAsTextFile
                        }
                    ]
                }
            ]}
        />
    )

}