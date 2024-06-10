import { PortfolioWindow } from "@/app/_components/Windows/PortfolioWindow/PortfolioWindow"
import { IWindow, IWindowComponentProps, IWindowTemplate, windowIdEnum, windowStatusEnum } from "./windows.types"
import { ThemeWindow } from "@/app/_components/Windows/ThemeWindow/ThemeWindow"
import { NotepadWindow } from "@/app/_components/Windows/NotepadWindow/NotepadWindow"
import Image from 'next/image';

// ICONS
import ThemeIcon from './assets/theme.svg';
import NotepadIcon from './assets/notepad.svg';
import PortfolioIcon from './assets/portfolio.svg';
import { ReactNode } from "react";
import { DocumentWindow } from "@/app/_components/Windows/DocumentWindow/DocumentWindow";
import { IDocumentWindowProps } from "@/app/_components/Windows/DocumentWindow/DocumentWindow.types";
import { MusicPlayerWindow } from "@/app/_components/Windows/MusicPlayerWindow/MusicPlayerWindow";

/**
 * Static dictionary of ALL windows/applications in the system.
 * Indexed by the ID of each window within windowIdEnum for faster lookups
 */
export const WINDOWS_DICT: Record<windowIdEnum, IWindowTemplate> = {
    [windowIdEnum.portfolio]: {
        id: windowIdEnum.portfolio,
        title: 'Case Studies',
        solo: true,
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
        solo: true,
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
        solo: false,
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
        solo: false,
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
        solo: true,
        position: {
            x: 150,
            y: 20,
            z: 0,
            w: 600,
            h: 500
        }
    }
}

/**
 * A map of components and icons, to a given windowId
 * Components/parsable JSON are kept separate in order to make saving of the system state to localStorage easier
 */
export const WINDOWS_COMPONENT_MAP: Record<windowIdEnum, (props?: any) => { component: ReactNode, icon: ReactNode }> = {
    [windowIdEnum.portfolio]: (props: IWindowComponentProps) => ({
        component: <PortfolioWindow {...props} />,
        icon: <Image 
            alt=''
            src={PortfolioIcon}  
            width={0}
            height={0}
            sizes='60vw'
            style={{ height: '100%' }}
        />
    }),
    [windowIdEnum.theme]: (props: IWindowComponentProps) => ({
        component: <ThemeWindow {...props} />,
        icon: <Image 
            alt=''
            src={ThemeIcon}  
            width={0}
            height={0}
            sizes='60vw'
            style={{ height: '100%' }}
        />
    }),
    [windowIdEnum.notepad]: (props: IWindowComponentProps) => ({
        component: <NotepadWindow {...props} />,
        icon: <Image 
            alt=''
            src={NotepadIcon}  
            width={0}
            height={0}
            sizes='60vw'
            style={{ height: '100%' }}
        />
    }),
    [windowIdEnum.document]: (props: IDocumentWindowProps) => ({
        component: <DocumentWindow {...props} />,
        icon: <Image 
        alt=''
        src={NotepadIcon}  
        width={0}
        height={0}
        sizes='60vw'
        style={{ height: '100%' }}
    />    
    }),
    [windowIdEnum.musicPlayer]: (props: IDocumentWindowProps) => ({
        component: <MusicPlayerWindow {...props} />,
        icon: <Image 
        alt=''
        src={NotepadIcon}  
        width={0}
        height={0}
        sizes='60vw'
        style={{ height: '100%' }}
    />    
    })
}