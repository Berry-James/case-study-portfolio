import { CSSProperties } from "react";

/**
 * @enum
 * 
 * @member default
 * @member dark
 * @member bliss
 * @member kitten
 * @member clouds
 */
export enum wallpaperIdEnum {
    dots,
    bliss,
    kitten,
    clouds,
}

/**
 * @interface
 * 
 * @member id           ID of the wallpaper in wallpaperIdEnum
 * @member name         Name of the wallpaper
 * @member style        Custom styles which apply only to this wallpaper's implementation
 */
export interface IWallpaper {
    id: wallpaperIdEnum;
    name: string;
    style: CSSProperties;
}