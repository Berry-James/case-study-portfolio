import React from 'react';
import { IDesktopIconProps } from './DesktopIcon.types';

export const DesktopIcon = ({ id, title, icon }: IDesktopIconProps) => {

    return (
        <div className='w-12 flex flex-col items-center justify-start cursor-pointer'>
            { icon } 
            <code>{ title }</code>
        </div>
    )

}