import { ReactNode } from "react"

export type UsePaint = () => UsePaintReturn;

export type UsePaintReturn = {
    // SETTINGS
    paintSettings: IPaintSettings;

    // ACTION STATES
    isResizing: boolean;

    // CANVAS ELEMENT
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    setCanvasRef: (element: HTMLCanvasElement) => void;

    // CALLBACKS
    setIsResizing: (newIsResizing: boolean) => void;
    setCanvasZoom: (newCanvasZoom: number) => void;
    setPrimaryColour: (newColour: string) => void;
    setSecondaryColour: (newColour: string) => void;
    setBrush: (newBrush: paintBrushEnum) => void;
    setCanvasDimensions: (newCanvasSize: CanvasDimensions) => void;
    downloadCanvasAsFile: () => void;
}

export type CanvasDimensions = { 
    w: number;
    h: number;
}

export interface IPaintSettings {
    colour: string;
    secondaryColour: string;
    brush: paintBrushEnum;
    canvasDimensions: CanvasDimensions;
    canvasZoom: number;
}

export enum paintBrushEnum {
    brush,
    pencil,
    eraser
}

export type PaintBrush = {
    id: paintBrushEnum;
    icon: ReactNode;
    name: string;
    attributes?: PaintBrushAttributes;
}

export type PaintBrushAttributes = Partial<CanvasPathDrawingStyles & CanvasShadowStyles & CanvasTextDrawingStyles & CanvasImageSmoothing & CanvasImageData & CanvasFilters & CanvasFillStrokeStyles>