import { useCallback, useReducer, useRef, useState } from "react"
import { CanvasDimensions, IPaintSettings, PaintBrushAttributes, UsePaint, paintBrushEnum } from "./usePaint.types";
import { PAINT_BRUSH_DICT } from "./usePaint.static";

export const usePaint: UsePaint = () => {

    // REDUCER
    const [paintSettings, paintSettingsDispatch] = useReducer(reducer, {
        colour: 'red',
        secondaryColour: '#FFF',
        brush: paintBrushEnum.pencil,
        canvasDimensions: {
            w: 300,
            h: 200
        },
        canvasZoom: 1
    })

    // STATE
    const [canvasInitialised, setCanvasInitialised] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isResizing, _setIsResizing] = useState(false);

    // REFS
    const positionRef = useRef({
        x: 0,
        y: 0
    });
    const tempCanvasDimensions = useRef({
        w: paintSettings.canvasDimensions.w,
        h: paintSettings.canvasDimensions.h
    })

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Store event unsubscriptions here
    const unsubMouseDown = useRef<Function | null>(null);
    const unsubMouseUp = useRef<Function | null>(null);
    const unsubMouseMove = useRef<Function | null>(null);
    const unsubMouseEnter = useRef<Function | null>(null);
    const unsubMouseLeave = useRef<Function | null>(null);

    const legacyCanvasRef = (element: HTMLCanvasElement) => {
        
        if(!element) {
            return element;
        }

        const unsubEvents = [
            unsubMouseDown,
            unsubMouseMove,
            unsubMouseUp,
            unsubMouseEnter,
            unsubMouseLeave
        ];

        unsubEvents.forEach(event => {
            if(event?.current && typeof event.current === 'function') {
                event.current();
            }
        });

        const ctx = element.getContext('2d');

        if(!canvasInitialised && ctx) {
            ctx.fillStyle = '#FFF';
            ctx.fillRect(0, 0, element.width, element.height);
            setCanvasInitialised(true);
        }

        const handleMouseDown = (e: MouseEvent) => {

            if(isResizing) { return }

            positionRef.current.x = e.offsetX;
            positionRef.current.y = e.offsetY;
            setIsDrawing(true);
        }

        const handleMouseMove = (e: MouseEvent) => {
            if(ctx && isDrawing && !isResizing) {
                draw(
                    // Canvas context
                    ctx, 

                    // Start position for line
                    positionRef.current.x / paintSettings.canvasZoom, 
                    positionRef.current.y / paintSettings.canvasZoom, 

                    // End position for line
                    e.offsetX / paintSettings.canvasZoom, 
                    e.offsetY / paintSettings.canvasZoom, 

                    // Brush colour
                    paintSettings.colour,

                    // Custom brush attributes
                    PAINT_BRUSH_DICT[paintSettings.brush].attributes,
                );
                positionRef.current.x = e.offsetX;
                positionRef.current.y = e.offsetY;
            }
        }

        const handleMouseUp = (e: MouseEvent) => {
            if(ctx && isDrawing) {
                draw(
                    ctx, 
                    positionRef.current.x, 
                    positionRef.current.y, 
                    e.offsetX, 
                    e.offsetY, 
                    paintSettings.colour, 
                    PAINT_BRUSH_DICT[paintSettings.brush].attributes
                );
                setIsDrawing(false);
                positionRef.current.x = 0;
                positionRef.current.y = 0;
            }
        }

        const handleMouseLeave = (e: MouseEvent) => {
            if(ctx && isDrawing) {
                setIsDrawing(false);
                positionRef.current.x = 0;
                positionRef.current.y = 0;
            }
        }

        const handleMouseEnter = (e: MouseEvent) => {
            // left click is held
            if(ctx && e.buttons === 1) {
                positionRef.current.x = e.offsetX;
                positionRef.current.y = e.offsetY;
                setIsDrawing(true);
            }
        }

        unsubMouseDown.current = () => {
            element.removeEventListener('mousedown', handleMouseDown);
        }

        unsubMouseMove.current = () => {
            element.removeEventListener('mousemove', handleMouseMove);
        }

        unsubMouseUp.current = () => {
            element.removeEventListener('mouseup', handleMouseUp);
        }

        unsubMouseEnter.current = () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
        }

        unsubMouseLeave.current = () => {
            element.removeEventListener('mouseleave', handleMouseLeave);
        }

        element.addEventListener('mousedown', handleMouseDown);
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseup', handleMouseUp);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mouseenter', handleMouseEnter);

        canvasRef.current = element;

        // return element;

    }

    // CALLBACKS
    const setPrimaryColour = useCallback((newColour: string) => {
        paintSettingsDispatch({ colour: newColour });
    }, []);

    const setSecondaryColour = useCallback((newColour: string) => {
        paintSettingsDispatch({ secondaryColour: newColour })
    }, []);

    const setBrush = useCallback((newBrush: paintBrushEnum) => {
        paintSettingsDispatch({ brush: newBrush });
    }, []);

    const setCanvasDimensions = useCallback((newCanvasDimensions: CanvasDimensions) => {
        paintSettingsDispatch({ canvasDimensions: newCanvasDimensions })
    }, []);

    const setCanvasZoom = useCallback((newCanvasZoom: number) => {
        paintSettingsDispatch({ canvasZoom: newCanvasZoom });
    }, []);

    const setIsResizing = useCallback((newIsResizing: boolean) => {
        _setIsResizing(newIsResizing);
    }, []);
    
    const downloadCanvasAsFile = useCallback(() => {

        try {
            if(!canvasRef.current) {
                throw new Error('No Canvas');
            }

            const dataUrl = canvasRef.current.toDataURL('image/png', 1.0);
            const link = document.createElement('a');

            link.download = 'my drawing.png';
            link.href = dataUrl;
            link.click();

            link.remove();
        } catch (err) {
            console.error(err);
        }
      
    }, []);

    const handleResizeCanvas = useCallback((e: MouseEvent) => {

        const newCanvasDimensions: CanvasDimensions = {
            w: tempCanvasDimensions.current.w + e.movementX,
            h: tempCanvasDimensions.current.h + e.movementY
        }

        tempCanvasDimensions.current = newCanvasDimensions;

        if(canvasRef.current) {
            canvasRef.current.width = newCanvasDimensions.w;
            canvasRef.current.height = newCanvasDimensions.h;
        }

        return newCanvasDimensions;

    }, [paintSettings.canvasDimensions, isResizing]);

    return {
        // SETTINGS STATE
        paintSettings,

        // ACTION STATES
        isResizing,

        // REF
        canvasRef,
        setCanvasRef: legacyCanvasRef,
        
        // Callbacks
        setIsResizing,
        setPrimaryColour,
        setSecondaryColour,
        setBrush,
        setCanvasDimensions,
        setCanvasZoom,
        downloadCanvasAsFile
    }
    
}

function draw(
    ctx: CanvasRenderingContext2D, 
    x1: number, 
    y1: number, 
    x2: number, 
    y2: number,
    colour: string,
    attributes?: PaintBrushAttributes
) {
    ctx.beginPath();
    ctx.strokeStyle = colour
    ctx.lineJoin = "round";
    
    if(attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
            if(key in ctx) {
                // @ts-ignore
                ctx[key as unknown as any] = value;
            }
        })
    }

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.stroke();
  }

function reducer(state: IPaintSettings, action: object) {
    return {
        ...state,
        ...action
    }
}