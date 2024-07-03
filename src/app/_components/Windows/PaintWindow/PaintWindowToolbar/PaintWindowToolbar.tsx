import React, { useContext, useMemo } from 'react';
import { WindowToolbar } from '../../WindowToolbar/WindowToolbar';
import { PaintWindowContext } from '../context/PaintWindowContext';

/**
 * Window toolbar for paint window
 * Contains save button
 * 
 * @returns Component
 */
export const PaintWindowToolbar = () => {

    // CONTEXT
    const { downloadCanvasAsFile } = useContext(PaintWindowContext);

    // COMPUTED
    /**
     * Compute a list of all toolbar items and memoise
     */
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