'use client';
import React, { useContext, useMemo } from 'react';
import { IWallpaperListItemProps } from './WallpaperListItem.types';
import { ThemeWindowContext } from '../../../context/ThemeWindowContext';

/**
 * Individual Wallpaper item
 * 
 * @param props             All props contained within @see {IWallpaper} type
 * @returns Component
 */
export const WallpaperListItem = (props: IWallpaperListItemProps) => {

    // CONTEXT
    const { selectedWallpaperId, handleSetSelectedWallpaper } = useContext(ThemeWindowContext);

    // COMPUTED
    /**
     * Computes if the selected Wallpaper ID is equal to this components id
     */
    const isSelected = useMemo(() => selectedWallpaperId === props.id, [selectedWallpaperId, props.id]);

    return (
        <li>
            <button
                className={`w-full ${isSelected ? 'bg-gray-50' : undefined} text-button`}
                onClick={() => handleSetSelectedWallpaper(props.id)}
            >

                {/* NAME */}
                <span>{ props.name }</span>

            </button>
        </li>
    )

}