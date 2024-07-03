import React, { useEffect, useRef, useState } from 'react';
import { gameStatusEnum } from '../MinesweeperWindow.types';
import { MinesweeperLcd } from '../MinesweeperLcd/MinesweeperLcd';
import { IMinesweeperTimerProps } from './MinesweeperTimer.types';

/**
 * Simple game timer for MinesweeperWindow
 * @see {MinesweeperWindow}
 * 
 * @param props.gameStatus          Status of game
 * @returns Componen
 */
export const MinesweeperTimer = ({ gameStatus }: IMinesweeperTimerProps) => {

    // STATE
    /**
     * Count-up timer
     */
    const [time, setTime] = useState(0);

    // REFS
    /**
     * Store cancel function for interval
     */
    const intervalRef = useRef<Function | null>(null);

    // SIDE EFFECTS
    /**
     * If game status is inProgress, start the timer
     * Otherwise, cancel the timer (if active)
     */
    useEffect(() => {

        // Clear previous interval
        if(intervalRef.current) {
            intervalRef.current();
        }

        // Store interval
        let interval: NodeJS.Timeout | null = null;

        // Switch based on gameStatus
        switch(gameStatus) {
            case gameStatusEnum.pending: {
                // If pending game start, clear the timer
                setTime(0);
                break;
            }
            case gameStatusEnum.inProgress: {
                // If game started, setup interval
                interval = setInterval(() => {
                    setTime((prevState) => prevState === 999 ? 999 : prevState + 1);
                }, 1000);

                intervalRef.current = () => {
                    clearInterval(interval as NodeJS.Timeout)
                }
                break;
            }
        }

        return () => {
            if(interval) {
                clearInterval(interval);
            }
        }

    }, [gameStatus])

    return (
        <MinesweeperLcd text={('000' + time).slice(-3)} />
    )

}