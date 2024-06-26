import { CSSProperties } from "react"
import { IWallpaper, wallpaperIdEnum } from "./theme.types"

// Array of available system highlight colours as RGB values
export const SYSTEM_HIGHLIGHT_COLOURS = [
    '66, 135, 245',
    '252, 186, 3',
    '66, 245, 182',
    '173, 66, 245',
    '245, 66, 132',
    '245, 66, 66',
    '245, 158, 66',
    '108, 245, 66'
]

/**
 * Base CSS properties to be shared amongst all wallpapers with a background-image
 */
const WALLPAPER_IMAGE_BASE: CSSProperties = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
}

/**
 * Static dictionary map of all wallpapers in the system
 */
export const WALLPAPER_DICT: Record<wallpaperIdEnum, IWallpaper> = {
    [wallpaperIdEnum.clouds]: {
        id: wallpaperIdEnum.clouds,
        name: 'Clouds',
        style: {
            ...WALLPAPER_IMAGE_BASE,
            backgroundImage: 'url("/assets/images/backgrounds/clouds.webp")'
        }
    },
    [wallpaperIdEnum.dots]: {
        id: wallpaperIdEnum.dots,
        name: 'Dots',
        style: {
            background: '#fffbf7',
            backgroundImage: 'radial-gradient(rgb(175, 175, 175) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            backgroundPosition: '-19px -19px'
        }
    },
    [wallpaperIdEnum.bliss]: {
        id: wallpaperIdEnum.bliss,
        name: 'Bliss',
        style: {
            ...WALLPAPER_IMAGE_BASE,
            backgroundImage: 'url("/assets/images/backgrounds/bliss.png")'
        }
    },
    [wallpaperIdEnum.kitten]: {
        id: wallpaperIdEnum.kitten,
        name: 'Kitten',
        style: {
            ...WALLPAPER_IMAGE_BASE,
            backgroundSize: '100% 100%',
            backgroundImage: 'url("/assets/images/backgrounds/kitten.png")'
        }
    }
}