import React, { useEffect, useState } from 'react';

/**
 * Simple clock component, displays the local time
 * 
 * @returns Component
 */
export const TaskbarClock = () => {
    
    // STATE
    /**
     * The curren date
     */
    const [date, setDate] = useState(new Date());

    // SIDE EFFECTS
    /**
     * Sets an interval to update the date every second
     */
    useEffect(() => {

        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(interval);

    }, []);

    return (
        <span className='w-12 text-sm'>
            {`00${date.getHours()}`.slice(-2)}:{`00${date.getMinutes()}`.slice(-2)}:{`00${date.getSeconds()}`.slice(-2)}
        </span>
    )

}