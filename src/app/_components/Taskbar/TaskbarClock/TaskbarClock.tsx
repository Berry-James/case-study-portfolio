import React, { useEffect, useState } from 'react';

export const TaskbarClock = () => {
    
    const [date, setDate] = useState(new Date());

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