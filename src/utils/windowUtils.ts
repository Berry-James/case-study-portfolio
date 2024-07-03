'use client';

import { WindowPosition } from "@/app/_components/SystemContext/_static/windows/windows.types";
import { TASKBAR_HEIGHT } from "@/app/_components/Taskbar/Taskbar";

export const centerWindow = (position: WindowPosition): WindowPosition => ({
    ...position,
    x: (window.innerWidth / 2) - (position.w / 2),
    y: (window.innerHeight / 2) - (position.h / 2) - TASKBAR_HEIGHT,
})