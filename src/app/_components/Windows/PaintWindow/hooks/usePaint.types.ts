import { ReactNode } from "react"

/**
 * UsePaint hook takes no args and returns @see UsePaintReturn
 */
export type UsePaint = () => UsePaintReturn;

/**
 * @member paintSettings            Global settings for paint canvas
 * @member isResizing               If true, canvas is being resized
 * @member canvasRef                Ref for canvas component
 * @member setCanvasRef             Function which assigns canvasRef and also injects necessary listeners
 * @member setIsResizing            Sets value if isResizing state
 * @member setCanvasZoom            Updates paintSettings canvasZoom
 * @member setPrimaryColour         Updates paintSettings primaryColour
 * @member setSecondaryColour       Updates paintSettings secondaryColour
 * @member setBrush                 Updates paintSettings brush
 * @member setCanvasDimensions      Updates paintSettings canvasDimensions, and handles saving/restoring canvas contents when redrawing canvas
 * @member downloadCanvasAsFile     Creates a .png file from current canvas contents and downloads
 */
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

/**
 * @member w            Width of canvas in pixels
 * @member h            Height of canvas in pixels
 */
export type CanvasDimensions = { 
    w: number;
    h: number;
}

/**
 * @member colour               Primary paint colour
 * @member secondaryColour      Secondary paint colour
 * @member brush                Current brush
 * @member canvasDimensions     Object containing current canvas w/h
 * @member canvasZoom           Zoom factor for canvas
 */
export interface IPaintSettings {
    colour: string;
    secondaryColour: string;
    brush: paintBrushEnum;
    canvasDimensions: CanvasDimensions;
    canvasZoom: number;
}

/**
 * @enum
 * 
 * @member brush
 * @member pencil
 * @member eraser
 */
export enum paintBrushEnum {
    brush,
    pencil,
    eraser
}

/**
 * @member id           ID of paint brush in paintBrushEnum
 * @member icon         Icon element
 * @member name         Name of brush
 * @member attributes   Attributes that should affect how the brush draws (i.e. size, colour overrides)
 */
export type PaintBrush = {
    id: paintBrushEnum;
    icon: ReactNode;
    name: string;
    attributes?: PaintBrushAttributes;
}

/**
 * All attributes that PaintBrush can apply
 */
export type PaintBrushAttributes = Partial<CanvasPathDrawingStyles & CanvasShadowStyles & CanvasTextDrawingStyles & CanvasImageSmoothing & CanvasImageData & CanvasFilters & CanvasFillStrokeStyles>