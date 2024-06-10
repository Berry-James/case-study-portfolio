import React, { PropsWithChildren, createContext, useState } from 'react';
import { ITaskbarStartMenuContext } from './TaskbarStartMenuContext.types';

/**
 * Functional context for the Taskbar start menu
 * @implements {ITaskbarStartMenuContext}
 * 
 * @returns React Context
 */
export const TaskbarStartMenuContext = createContext<ITaskbarStartMenuContext>({
    isOpen: false,
    handleSetIsOpen: (newIsOpen: boolean) => undefined
});

/**
 * Provider for the @see {TaskbarStartMenuContext}
 * 
 * @param props.children            Child components
 * @returns Component
 */
export const TaskbarStartMenuContextProvider = ({ children }: PropsWithChildren) => {

    // STATE
    /**
     * Whether or not the start menu is open
     */
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // HANDLERS
    /**
     * Callback used to set isOpen to the given value
     * 
     * @param newIsOpen             Whether or not the start menu should be open
     * @returns void
     */
    const handleSetIsOpen = (newIsOpen: boolean) => setIsOpen(newIsOpen)

    return (
        <TaskbarStartMenuContext.Provider
            value={{
                isOpen,
                handleSetIsOpen
            }}
        >
            { children }
        </TaskbarStartMenuContext.Provider>
    )

}