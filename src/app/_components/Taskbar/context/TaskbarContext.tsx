'use client';
import React, { createContext, useState } from 'react';
import { ITaskbarContext, ITaskbarContextProviderProps, WindowDict, windowStatusEnum } from './TaskbarContext.types';
import { PortfolioWindow } from '../../Windows/PortfolioWindow/PortfolioWindow';
import { FaGithub } from 'react-icons/fa';
import { VscSparkle } from 'react-icons/vsc';

const DEFAULT_WINDOWS: WindowDict = {
    1: {
        id: '1',
        title: 'Case Studies',
        icon: <VscSparkle />,
        component: <PortfolioWindow />,
        status: windowStatusEnum.open,
        location: {
            x: 0,
            y: 0
        }
    }
}

// const WALLPAPERS = [
//     {
//         id: '1',
//         src: 
//     }
// ]

export const TaskbarContext = createContext<ITaskbarContext>({
    windows: DEFAULT_WINDOWS,
    // wallpaper: 
    handleSetWindowStatus: (id: string, newStatus: windowStatusEnum) => undefined
})

export const TaskbarContextProvider = ({ children }: ITaskbarContextProviderProps) => {

    // STATE
    const [windows, setWindows] = useState<WindowDict>({...DEFAULT_WINDOWS});

    const handleSetWindowStatus = (id: string, newStatus: windowStatusEnum) => {
        setWindows((prevState) => {
            if(prevState[id]) {
                return {
                    ...prevState,
                    [id]: {
                        ...prevState[id],
                        status: newStatus
                    }
                }
            }
            return prevState;
        })
    }

    return (
        <TaskbarContext.Provider
            value={{
                windows,
                handleSetWindowStatus
            }}
        >
            {children}
        </TaskbarContext.Provider>
    )

}