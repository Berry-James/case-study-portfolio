import localFont from 'next/font/local';
import React from 'react';
import { IMinesweeperLcdProps } from './MinesweeperLcd.types';

// Define font
const lcdFont = localFont({
    src: '../../../../_static/fonts/lcd/digital-7 (mono).ttf',
    display: 'swap',
})

/**
 * 7 cell display for time/flag count
 * 
 * @param props.text            Text to display in LCD 
 * @returns Component
 */
export const MinesweeperLcd = ({ text }: IMinesweeperLcdProps) => {

    return (
        <div 
            className={`${lcdFont.className} relative text-red-500 text-2xl bg-black h-max flex items-center justify-center leading-none` }
        >
            <span>
                {text}
            </span>
            <span
                className='opacity-30 absolute left-0 top-0'
            > 
                888
            </span>
        </div>
    )

}