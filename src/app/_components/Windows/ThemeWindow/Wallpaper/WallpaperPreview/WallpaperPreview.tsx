import React, { useContext } from 'react';
import { ThemeWindowContext } from '../../context/ThemeWindowContext';
import { WALLPAPER_DICT } from '@/app/_components/SystemContext/_static/theme/theme.static';
import Image from 'next/image';

// IMAGES
import PcScreenImage from '../../../../../_static/imgs/theme-window-screen.png';

/**
 * Preview of a chosen wallpaper
 * 
 * @returns Component
 */
export const WallpaperPreview = () => {

    // CONTEXT
    const { selectedWallpaperId } = useContext(ThemeWindowContext);

    return (
        <div
            style={{
                background: 'lightgrey',
                padding: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'relative'
            }}
        >

            {/* NAME OF WALLPAPER */}
            <span>{ WALLPAPER_DICT[selectedWallpaperId].name }</span>
            
             {/* PREVIEW */}
             <div className='relative'>
                <Image 
                    src={PcScreenImage} height={120} width={160}
                    loading='lazy'
                    alt=''
                    style={{
                        position: 'relative',
                        zIndex: 2
                    }}
                />
                <div
                    style={{
                        ...WALLPAPER_DICT[selectedWallpaperId].style,
                        position: 'absolute',
                        width: 128,
                        height: 95,
                        top: 16,
                        left: 16,
                        zIndex: 1,
                        // borderRadius: '2px'
                    }}
                >
             </div>
           
            </div>

        </div>
    )

}