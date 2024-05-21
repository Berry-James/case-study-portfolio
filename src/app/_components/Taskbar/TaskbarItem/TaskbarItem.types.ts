import { ReactNode } from "react";
import { IWindow, windowStatusEnum } from "../context/TaskbarContext.types";

export type ITaskbarItemProps = Omit<IWindow, 'component'>;