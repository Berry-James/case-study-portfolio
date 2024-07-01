import { logInAction } from '@/actions/login.actions';
import { SystemContext } from '@/app/_components/SystemContext/SystemContext';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

const MESSAGES = [
    'Loading system settings',
    'Detecting Devices',
    'Setting up desktop environment',
    'Finalising...'
]

export const LoginWindowSuccessDialog = () => {
    
    // CONTEXT
    const { clearAllWindows } = useContext(SystemContext);

    const [messageIndex, setMessageIndex] = useState(0);

    const clearIntervalRef = useRef<Function | null>(null);

    useEffect(() => {
        const interval = setInterval(async () => {
            await updateMessageIndex();
        }, Math.random() * 1200);

        clearIntervalRef.current = () => {
            clearInterval(interval);
        };

        return () => {
            clearInterval(interval);
        }
    }, [messageIndex]);

    const updateMessageIndex = useCallback(async () => {

        if(MESSAGES[messageIndex] + 1) {
            setMessageIndex((prevState) => prevState + 1);
        } else {
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
            <span>{MESSAGES[messageIndex] || MESSAGES[MESSAGES.length - 1]}</span>
            <progress 
                max={MESSAGES.length - 1} 
                value={messageIndex} 
                className='win-bezel-inverted'
            />
        </div>
    )

}