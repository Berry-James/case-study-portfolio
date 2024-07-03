import { PropsWithChildren } from "react";
import { wallpaperIdEnum } from "./_static/theme/theme.types";
import { IWindow, IWindowTemplate, WindowDict, WindowPosition, windowIdEnum, windowStatusEnum } from "./_static/windows/windows.types";

export interface ISystemContext {
    windows: Record<string, IWindow>;
    activeWallpaperId: wallpaperIdEnum;
    activeWindowInstanceId: string | null;
    highlightColour: string;
    volume: number;
    isMuted: boolean;
    isMobile: boolean;
    handleSetIsMuted: (newIsMuted: boolean) => void;
    handleSetVolume: (newVolume: number) => void;
    handleSetHighlightColour: (newHighlightColour: string) => void;
    handleSetWindowStatus: (instanceId: string, newStatus: windowStatusEnum) => void;
    handleSetWindowPosition: (instanceId: string, newPos: Partial<WindowPosition>) => void;
    handleSetActiveWallpaperId: (newActiveWallpaperId: wallpaperIdEnum) => void;
    handleSetActiveWindowInstanceId: (instanceId: string | null) => void;
    handleOpenWindow: (id: windowIdEnum, windowOverride?: Partial<IWindowTemplate>) => string;
    handleCloseWindow: (instanceId: string) => void;
    clearAllWindows: () => Promise<void>;
    restoreSave: () => void;
}

export type ISystemContextProviderProps = PropsWithChildren<{
    initialState: {
        isMobile: boolean;
    }
}>