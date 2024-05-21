import React from 'react';
import { MdOutlineDarkMode } from 'react-icons/md';
import { IDesktopIcon } from './DesktopIcon/DesktopIcon.types';
import { DesktopIcon } from './DesktopIcon/DesktopIcon';
import { FaImage } from 'react-icons/fa';

const DESKTOP_ICONS: IDesktopIcon[] = [
    {
        id: '1',
        title: 'Toggle Theme',
        icon: <MdOutlineDarkMode fontSize={'2rem'} />
    },
    {
        id: '2',
        title: 'Change Wallpaper',
        icon: <FaImage fontSize={'2rem'} />
    }
]

export const DesktopIcons = () => {
    
    return (
        <div className='absolute top-4 left-4 flex flex-col gap-12'>
            {
                  DESKTOP_ICONS.map((icon, iconIndex) => {
        
                    return (
                        <DesktopIcon key={icon.id} {...icon} />
                    )
            
                })
            }
        </div>
    )
  

}
