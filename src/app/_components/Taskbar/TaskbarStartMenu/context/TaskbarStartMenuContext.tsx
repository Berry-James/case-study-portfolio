'use client';
import React, { PropsWithChildren, createContext, useRef, useState } from 'react';
import { ITaskbarStartMenuContext } from './TaskbarStartMenuContext.types';

/**
 * Functional context for the Taskbar start menu
 * @implements {ITaskbarStartMenuContext}
 * 
 * @returns React Context
 */
export const TaskbarStartMenuContext = createContext<ITaskbarStartMenuContext>({
    isOpen: false,
    startMenuRef: { current: null },
    startButtonRef: { current: null },
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

    // REFS
    const startMenuRef = useRef<HTMLDivElement | null>(null);
    const startButtonRef = useRef<HTMLButtonElement | null>(null);
    const unsubscribe = useRef<Function | null>(null);

    // HANDLERS
    /**
     * Callback used to set isOpen to the given value
     * 
     * @param newIsOpen             Whether or not the start menu should be open
     * @returns void
     */
    const handleSetIsOpen = (newIsOpen: boolean) => {
        setIsOpen(newIsOpen);

        if(unsubscribe.current && typeof unsubscribe.current === 'function') {
            unsubscribe.current();
        }

        if(newIsOpen && startMenuRef?.current) {
            const handleMouseDown = (e: MouseEvent) => {

                if(
                    // We have event target
                    e.target &&
                    // We have start menu ref
                    startMenuRef?.current &&
                    // Start button ref is equal to current target
                    startButtonRef.current !== e.target &&
                    // Target is not within startMenuRef
                    !startMenuRef.current.contains(e.target as Element)
                ) {
                    setIsOpen(false);
                    document.removeEventListener('mousedown', handleMouseDown);
                }
            }

            unsubscribe.current = () => {
                document.removeEventListener('mousedown', handleMouseDown);
            }

            document.addEventListener('mousedown', handleMouseDown);
        }
    }

    return (
        <TaskbarStartMenuContext.Provider
            value={{
                isOpen,
                startMenuRef,
                startButtonRef,
                handleSetIsOpen
            }}
        >
            { children }
        </TaskbarStartMenuContext.Provider>
    )

}