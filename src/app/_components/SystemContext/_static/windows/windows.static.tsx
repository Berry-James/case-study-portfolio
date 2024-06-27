import { PortfolioWindow } from "@/app/_components/Windows/PortfolioWindow/PortfolioWindow"
import { IWindowComponentProps, IWindowTemplate, windowIdEnum, windowStatusEnum } from "./windows.types"
import { ThemeWindow } from "@/app/_components/Windows/ThemeWindow/ThemeWindow"
import { NotepadWindow } from "@/app/_components/Windows/NotepadWindow/NotepadWindow"
import Image, { ImageProps } from 'next/image';
import { ReactNode } from "react";
import { DocumentWindow } from "@/app/_components/Windows/DocumentWindow/DocumentWindow";
import { IDocumentWindowProps } from "@/app/_components/Windows/DocumentWindow/DocumentWindow.types";
import { MusicPlayerWindow } from "@/app/_components/Windows/MusicPlayerWindow/MusicPlayerWindow";
import { PaintWindow } from "@/app/_components/Windows/PaintWindow/PaintWindow";

// ICONS
import NotepadIcon from '../../../../_static/icons/png/notepad-4.png';
import PortfolioIcon from '../../../../_static/icons/png/desktop_w95-0.png';
import MediaPlayerIcon from '../../../../_static/icons/png/media_player-0.png';
import DocumentViewerIcon from '../../../../_static/icons/png/document-0.png';
import ThemeIcon from '../../../../_static/icons/png/themes-4.png';
import PaintIcon from '../../../../_static/icons/png/paint_old-1.png';
import { LoginWindow } from "@/app/login/_components/LoginWindow/LoginWindow";
import { ImageWindow } from "@/app/_components/Windows/ImageWindow/ImageWindow";


/**
 * Static dictionary of ALL windows/applications in the system.
 * Indexed by the ID of each window within windowIdEnum for faster lookups
 */
export const WINDOWS_DICT: Record<windowIdEnum, IWindowTemplate> = {
    [windowIdEnum.login]: {
        id: windowIdEnum.login,
        title: 'Enter Password',
        rules: {
            disableMinimise: true,
            disableClose: true,
            disableStartMenuShortcut: true,
            solo: true,
        },
        position: {
            x: 150,
            y: 20,
            z: 0,
            w: 600,
            h: 500
        }
    },
    [windowIdEnum.image]: {
        id: windowIdEnum.image,
        title: 'View Image',
        rules: {
            disableStartMenuShortcut: true,
            solo: false,
        },
        position: {
            x: 150,
            y: 20,
            z: 0,
            w: 600,
            h: 500
        }
    },
    [windowIdEnum.portfolio]: {
        id: windowIdEnum.portfolio,
        title: 'Case Studies',
        rules: {
            solo: true,
        },        
        position: {
            x: 150,
            y: 20,
            z: 0,
            w: 600,
            h: 500
        }
    },
    [windowIdEnum.theme]: {
        id: windowIdEnum.theme,
        title: 'System Theme',
        rules: {
            solo: true,
        },    
        position: {
            x: 150,
            y: 20,
            z: 0,
            w: 600,
            h: 500
        }
    },
    [windowIdEnum.notepad]: {
        id: windowIdEnum.notepad,
        title: 'Notepad',
        rules: {
            solo: false,
        },    
        position: {
            x: 150,
            y: 20,
            z: 0,
            w: 600,
            h: 500
        }
    },
    [windowIdEnum.document]: {
        id: windowIdEnum.document,
        title: 'Document View',
        rules: {
            solo: false,
        },    
        position: {
            x: 150,
            y: 20,
            z: 0,
            w: 600,
            h: 500
        }
    },
    [windowIdEnum.musicPlayer]: {
        id: windowIdEnum.musicPlayer,
        title: 'Music Player',
        rules: {
            solo: true,
        },    
        position: {
            x: 150,
            y: 20,
            z: 0,
            w: 600,
            h: 500
        }
    },
    [windowIdEnum.paint]: {
        id: windowIdEnum.paint,
        title: 'Paint',
        rules: {
            solo: false,
        },    
        position: {
            x: 150,
            y: 20,
            z: 0,
            w: 600,
            h: 500
        }
    }
}

const ICON_PROPS: Partial<ImageProps> & { alt: string } = {
    style: {
        width: '100%',
        imageRendering: 'pixelated'
    },
    alt: '',
    width: 0,
    height: 0,
    sizes: '60vw',
    priority: true
   
}

/**
 * A map of components and icons, to a given windowId
 * Components/parsable JSON are kept separate in order to make saving of the system state to localStorage easier
 */
export const WINDOWS_COMPONENT_MAP: Record<windowIdEnum, (props?: any) => { component: ReactNode, icon: ReactNode }> = {
    [windowIdEnum.portfolio]: (props: IWindowComponentProps) => ({
        component: <PortfolioWindow {...props} />,
        icon: <Image
            src={PortfolioIcon}
            {...ICON_PROPS} />
    }),
    [windowIdEnum.image]: (props: IWindowComponentProps) => ({
        component: <ImageWindow {...props} />,
        icon: <Image
            src={PortfolioIcon}
            {...ICON_PROPS} 
        />
    }),
    [windowIdEnum.theme]: (props: IWindowComponentProps) => ({
        component: <ThemeWindow {...props} />,
        icon: <Image
            src={ThemeIcon}
            {...ICON_PROPS} />
    }),
    [windowIdEnum.notepad]: (props: IWindowComponentProps) => ({
        component: <NotepadWindow {...props} />,
        icon: <Image
            src={NotepadIcon}
            {...ICON_PROPS} />
    }),
    [windowIdEnum.document]: (props: IDocumentWindowProps) => ({
        component: <DocumentWindow {...props} />,
        icon: <Image
            src={DocumentViewerIcon}
            {...ICON_PROPS} />
    }),
    [windowIdEnum.musicPlayer]: (props: IDocumentWindowProps) => ({
        component: <MusicPlayerWindow {...props} />,
        icon: <Image
            src={MediaPlayerIcon}
            {...ICON_PROPS} />
    }),
    [windowIdEnum.paint]: (props: IDocumentWindowProps) => ({
        component: <PaintWindow {...props} />,
        icon: <Image
            src={PaintIcon}
            {...ICON_PROPS} />
    }),
    [windowIdEnum.login]: (props: IDocumentWindowProps) => ({
        component: <LoginWindow {...props} />,
        icon: <div />
    })
}