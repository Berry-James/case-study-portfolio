import React from 'react';
import { WallpaperPreview } from './WallpaperPreview/WallpaperPreview';
import { WallpaperList } from './WallpaperList/WallpaperList';

/**
 * Wallpaper configuration segment of Theme Window
 * 
 * @returns
 */
export const Wallpaper = () => {

    return (
        <div>
            {/* TITLE */}
            <span>Configure Wallpaper</span>

            {/* PREVIEW */}
            <WallpaperPreview />

            {/* LIST */}
            <WallpaperList />
        </div> 
    )

}