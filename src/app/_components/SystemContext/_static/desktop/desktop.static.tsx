import { IDesktopIcon } from "@/app/_components/DesktopIcons/DesktopIcon/DesktopIcon.types";
import { windowIdEnum } from "../windows/windows.types";
import { WINDOWS_COMPONENT_MAP, WINDOWS_DICT } from "../windows/windows.static";

/**
 * Static Array of all Desktop Icons
 */
export const DESKTOP_ICONS: IDesktopIcon[] = [
    {
        id: '1',
        windowId: windowIdEnum.portfolio,
        title: WINDOWS_DICT[windowIdEnum.portfolio].title,
        icon: WINDOWS_COMPONENT_MAP[windowIdEnum.portfolio]().icon
    },
    {
        id: '2',
        windowId: windowIdEnum.theme,
        title: WINDOWS_DICT[windowIdEnum.theme].title,
        icon: WINDOWS_COMPONENT_MAP[windowIdEnum.theme]().icon
    },
    {
        id: '3',
        windowId: windowIdEnum.notepad,
        title: WINDOWS_DICT[windowIdEnum.notepad].title,
        icon: WINDOWS_COMPONENT_MAP[windowIdEnum.notepad]().icon
    },
    {
        id: '4',
        windowId: windowIdEnum.paint,
        title: WINDOWS_DICT[windowIdEnum.paint].title,
        icon: WINDOWS_COMPONENT_MAP[windowIdEnum.paint]().icon
    },
    {
        id: '5',
        windowId: windowIdEnum.musicPlayer,
        title: WINDOWS_DICT[windowIdEnum.musicPlayer].title,
        icon: WINDOWS_COMPONENT_MAP[windowIdEnum.musicPlayer]().icon
    }
]