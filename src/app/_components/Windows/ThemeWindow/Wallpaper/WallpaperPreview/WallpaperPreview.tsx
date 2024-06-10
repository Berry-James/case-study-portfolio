import React, { useContext } from 'react';
import { ThemeWindowContext } from '../../context/ThemeWindowContext';
import { WALLPAPER_DICT } from '@/app/_components/SystemContext/_static/theme/theme.static';

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
                flexDirection: 'column'
            }}
        >

            {/* NAME OF WALLPAPER */}
            <span>{ WALLPAPER_DICT[selectedWallpaperId].name }</span>
            
             {/* PREVIEW */}
             <div
                style={{
                    width: 140,
                    height: 100,
                    ...WALLPAPER_DICT[selectedWallpaperId].style
                }}
            >
                
            </div>

        </div>
    )

}