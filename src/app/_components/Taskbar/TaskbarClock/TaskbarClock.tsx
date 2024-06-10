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
        <span>
            {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
        </span>
    )

}