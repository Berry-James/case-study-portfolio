import { ReactNode } from "react";
import { cellEnum, flippedCellEnum, gameStatusEnum } from "../MinesweeperWindow.types";
import Image from 'next/image';

// ICONS
import MineIcon from '../../../../_static/icons/png/game_mine_1-1.png'

// Colour palette for mine count text
const PALETTE = [
    '',
    '#0303fc',
    '#068206',
    '#fe0400',
    '#80007f'
];

/**
 * Generate content for a cell based on column value, cell and game status
 * 
 * @param column            Value of the column
 * @param cellStatus        Status of the cell (flipped/flagged)
 * @param gameStatus        Game status (if game is over, show cell as if it were flipped)
 * 
 * @returns Node content for the cell
 */
export function getCellContents(column: number, cellStatus: flippedCellEnum, gameStatus: gameStatusEnum): ReactNode {

    if(gameStatus === gameStatusEnum.inProgress || gameStatus === gameStatusEnum.pending) {
        switch(cellStatus) {
            case flippedCellEnum.unflipped: {
                return null;
            }
            case flippedCellEnum.flagged: {
                return 'F';
            }
        }
    }

    switch(column) {
        case 0: {
            return null
        }
        case cellEnum.mine: {
            return <Image src={MineIcon} width={12} height={12} alt='' />
        }
        default: {
            return <span style={{ fontWeight: 'bold', color: PALETTE[column] }}>{column}</span>
        }
    }
}

/**
 * Determine if a cell doesn't have mines
 * 
 * @param map               Current map
 * @param rowIndex          Row index to set
 * @param columnIndex       Column index to set
 * 
 * @returns Whether or not the cell at the given rowIndex/columnIndex inside map is a mine
 */
export function isValidCell(map: number[][], rowIndex: number, columnIndex: number): boolean {

    return  map[rowIndex]?.[columnIndex] !== undefined &&
            map[rowIndex]?.[columnIndex] !== -1

}
