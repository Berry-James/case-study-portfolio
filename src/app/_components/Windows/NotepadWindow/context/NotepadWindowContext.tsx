import React, { PropsWithChildren, createContext, useCallback, useRef } from 'react';
import { INotepadWindowContext } from './NotepadWindowContext.types';

export const NotepadWindowContext = createContext<INotepadWindowContext>({
    notepadRef: { current: null },
    downloadAsTextFile: () => undefined
});

export const NotepadWindowContextProvider = ({ children }: PropsWithChildren) => {

    const notepadRef = useRef<HTMLTextAreaElement | null>(null);

    // CALLBACKS
    const downloadAsTextFile = useCallback(() => {

        const textContent = notepadRef?.current?.value;

        const file = new Blob(textContent ? [textContent] : undefined, { type: 'text/plain' });

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