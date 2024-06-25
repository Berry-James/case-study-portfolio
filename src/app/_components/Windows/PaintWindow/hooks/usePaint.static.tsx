import { PaintBrush, paintBrushEnum } from "./usePaint.types";
import Image from "next/image";

// ICONS
import PaintBrushIcon from '../../../../_static/icons/png/paint-brush.png'
import PaintPencilIcon from '../../../../_static/icons/png/paint-pencil.png'
import PaintEraserIcon from '../../../../_static/icons/png/paint-eraser.png'

export const PAINT_BRUSH_DICT: Record<paintBrushEnum, PaintBrush> = {
    [paintBrushEnum.pencil]: {
        id: paintBrushEnum.pencil,
        name: 'Pencil',
        icon: <Image src={PaintPencilIcon} height={64} width={64} alt="Pencil" />,
        attributes: {
            lineWidth: 1
        }
    },
    [paintBrushEnum.brush]: {
        id: paintBrushEnum.brush,
        name: 'Brush',
        icon: <Image src={PaintBrushIcon} height={64} width={64} alt="Brush" />,
        attributes: {
            lineWidth: 8
        }
    },
    [paintBrushEnum.eraser]: {
        id: paintBrushEnum.eraser,
        name: 'Eraser',
        icon: <Image src={PaintEraserIcon} height={64} width={64} alt="Eraser" />,
        attributes: {
            lineWidth: 8,
            strokeStyle: '#FFF'
        }
    }
}