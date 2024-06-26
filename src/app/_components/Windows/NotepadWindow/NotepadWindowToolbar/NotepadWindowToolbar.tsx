import React, { useContext } from 'react';
import { WindowToolbar } from '../../WindowToolbar/WindowToolbar';
import { NotepadWindowContext } from '../context/NotepadWindowContext';

export const NotepadWindowToolbar = () => {

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