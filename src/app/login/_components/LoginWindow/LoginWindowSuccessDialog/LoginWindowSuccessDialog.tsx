import { logInAction } from '@/actions/login.actions';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

// Static messages to display when faking the loading
const MESSAGES = [
    'Loading system settings',
    'Detecting Devices',
    'Setting up desktop environment',
    'Finalising...'
]

/**
 * Fake login success dialog which depicts the system loading.
 * Automatically cycles through given messages with random intervals
 * 
 * @returns Component
 */
export const LoginWindowSuccessDialog = () => {
    
    // CONTEXT
    const { clearAllWindows } = useContext(SystemContext);

    // STATE
    /**
     * Index of currently viewed message in MESSAGES const
     */
    const [messageIndex, setMessageIndex] = useState(0);

    // REFS
    /**
     * Store interval function ref
     */
    const clearIntervalRef = useRef<Function | null>(null);

    // SIDE EFFECTS
    /**
     * Sets an interval with a random duration and updates messageIndex after completion
     */
    useEffect(() => {

        // Create intervla
        const interval = setInterval(async () => {
            await updateMessageIndex();
        }, Math.random() * 1200);

        // Store ref to interval func
        clearIntervalRef.current = () => {
            clearInterval(interval);
        };

        // Clear interval on return
        return () => {
            clearInterval(interval);
        }
    }, [messageIndex]);

    // CALLBACKS
    /**
     * Updates the index of the message to be viewed
     */
    const updateMessageIndex = useCallback(async () => {

        // If a message exists after the current one, set index to +1
        if(MESSAGES[messageIndex] + 1) {
            setMessageIndex((prevState) => prevState + 1);
        } else {
            // Otherwise, we've reached the end of our messages.  Clear all windows and call loginAction()
            if(clearIntervalRef.current) {
                clearIntervalRef.current();
                await clearAllWindows();
                await logInAction();
            }
        }

    }, [messageIndex])

    return (
        <div
            className='flex flex-col gap-1 px-2'
        >
            {/* MESSAGE TEXT */}
            <span>{MESSAGES[messageIndex] || MESSAGES[MESSAGES.length - 1]}</span>

            {/* PROGRESS BAR */}
            <progress 
                max={MESSAGES.length - 1} 
                value={messageIndex} 
                className='win-bezel-inverted'
            />
        </div>
    )

}