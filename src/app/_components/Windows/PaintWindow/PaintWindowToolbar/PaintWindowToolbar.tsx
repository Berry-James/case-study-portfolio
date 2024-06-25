import React, { useContext, useMemo } from 'react';
import { WindowToolbar } from '../../WindowToolbar/WindowToolbar';
import { PaintWindowContext } from '../context/PaintWindowContext';

export const PaintWindowToolbar = () => {

    // CONTEXT
    const { downloadCanvasAsFile } = useContext(PaintWindowContext);

    // COMPUTED
    const computedToolbarItems = useMemo(() => ([
        {
            name: 'File',
            options: [
                {
                    name: 'Save',
                    action: downloadCanvasAsFile
                }
            ]
        }
    ]), []);

    return (
        <WindowToolbar 
            items={computedToolbarItems}
        />
    )

}