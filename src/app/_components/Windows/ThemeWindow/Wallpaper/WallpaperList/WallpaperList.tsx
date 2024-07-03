import React from 'react';
import { WallpaperListItem } from './WallpaperListItem/WallpaperListItem';
import { WALLPAPER_DICT } from '@/app/_components/SystemContext/_static/theme/theme.static';

/**
 * List of all wallpapers
 * 
 * @returns Component
 */
export const WallpaperList = () => {

    return (
        <div>

            {/* TITLE */}
            <span>Select Wallpaper</span>

            {/* LIST */}
            <ul>
                {
                    Object.values(WALLPAPER_DICT).map((wallpaper, wallpaperIndex) => {

                        return (
                            <WallpaperListItem key={wallpaper.id} {...wallpaper} />
                        )

                    })
                }
            </ul>
        </div>
       
    )

}