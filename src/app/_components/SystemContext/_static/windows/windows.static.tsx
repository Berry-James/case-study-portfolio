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
import { LoginWindow } from "@/app/login/_components/LoginWindow/LoginWindow";
import { ImageWindow } from "@/app/_components/Windows/ImageWindow/ImageWindow";
import { DialogWindow } from "@/app/_components/Windows/DialogWindow/DialogWindow";
import { IDialogWindowProps } from "@/app/_components/Windows/DialogWindow/DialogWindow.types";
import { MinesweeperWindow } from "@/app/_components/Windows/MinesweeperWindow/MinesweeperWindow";

// ICONS
import NotepadIcon from '../../../../_static/icons/png/notepad-4.png';
import PortfolioIcon from '../../../../_static/icons/png/desktop_w95-0.png';
import MediaPlayerIcon from '../../../../_static/icons/png/media_player-0.png';
import DocumentViewerIcon from '../../../../_static/icons/png/document-0.png';
import ThemeIcon from '../../../../_static/icons/png/themes-4.png';
import PaintIcon from '../../../../_static/icons/png/paint_old-1.png';
import DialogIcon from '../../../../_static/icons/png/msg_information-0.png';
import LoginIcon from '../../../../_static/icons/png/users_key-4.png';
import MinesweeperIcon from '../../../../_static/icons/png/game_mine_1-0.png';

/**
 * Static dictionary of ALL windows/applications in the system.
 * Indexed by the ID of each window within windowIdEnum for faster lookups
 */
export const WINDOWS_DICT: Record<windowIdEnum, IWindowTemplate> = {
    [windowIdEnum.dialog]: {
        id: windowIdEnum.dialog,
        title: 'Notification',
        rules: {
            solo: false,
            disableStartMenuShortcut: true,
            disableMinimise: true,
        },
        position: {
            x: 150,
            y: 20,
            z: 0,
            w: 240,
            h: 140
        }
    },
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
            w: 500,
            h: 700
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
    },
    [windowIdEnum.minesweeper]: {
        id: windowIdEnum.minesweeper,
        title: 'Minesweeper',
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
}

const ICON_PROPS: Partial<ImageProps> & { alt: string } = {
    style: {
        // width: '100%',
        // width: 'auto',
        // height: 'auto',
        imageRendering: 'pixelated'
    },
    alt: '',
    width: 32,
    height: 32,
    // sizes: '60vw',
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
            {...ICON_PROPS} />
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
    [windowIdEnum.musicPlayer]: (props: IWindowComponentProps) => ({
        component: <MusicPlayerWindow {...props} />,
        icon: <Image
            src={MediaPlayerIcon}
            {...ICON_PROPS} />
    }),
    [windowIdEnum.paint]: (props: IWindowComponentProps) => ({
        component: <PaintWindow {...props} />,
        icon: <Image
            src={PaintIcon}
            {...ICON_PROPS} 
        />
    }),
    [windowIdEnum.login]: (props: IWindowComponentProps) => ({
        component: <LoginWindow {...props} />,
        icon: <Image 
            src={LoginIcon}
            {...ICON_PROPS}
        />
    }),
    [windowIdEnum.dialog]: (props: IDialogWindowProps) => ({
        component: <DialogWindow {...props} />,
        icon: <Image
            src={DialogIcon}
            {...ICON_PROPS} 
        />
    }),
    [windowIdEnum.minesweeper]: (props: IWindowComponentProps) => ({
        component: <MinesweeperWindow {...props} />,
        icon: <Image
            src={MinesweeperIcon}
            {...ICON_PROPS} 
        />
    })
}