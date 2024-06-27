import React, { PropsWithChildren, createContext, useCallback, useRef } from 'react';
import { INotepadWindowContext } from './NotepadWindowContext.types';

/**
 * Functional context for the Notepad Window
 * @implements {INotepadWindowContext}
 * 
 * @returns Context
 */
export const NotepadWindowContext = createContext<INotepadWindowContext>({
    notepadRef: { current: null },
    downloadAsTextFile: () => undefined
});

/**
 * Provider for the NotepadWindow Context
 * @see NotepadWindowContext
 * 
 * @param props.children            Child components
 * @returns Context Provider
 */
export const NotepadWindowContextProvider = ({ children }: PropsWithChildren) => {

    // REFS
    /**
     * Ref for the notepad textArea element
     */
    const notepadRef = useRef<HTMLTextAreaElement | null>(null);

    // CALLBACKS
    /**
     * Download the contents of the notepad textArea as a .txt file
     */
    const downloadAsTextFile = useCallback(() => {

        // Create file
        const textContent = notepadRef?.current?.value;
        const file = new Blob(textContent ? [textContent] : undefined, { type: 'text/plain' });

        // Create link, download, revoke link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = 'my-text-file.txt';
        link.click();
        URL.revokeObjectURL(link.href);
        link.remove();

    }, []);

    return (
        <NotepadWindowContext.Provider
            value={{
                notepadRef,
                downloadAsTextFile
            }}
        >
            {children}
        </NotepadWindowContext.Provider>
    )
    
}