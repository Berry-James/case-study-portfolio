/**
 * @enum
 * 
 * @member easy
 * @member intermediate
 * @member hard
 * @member expert
 */
export enum difficultyEnum {
    easy,
    intermediate,
    hard,
    expert
}

/**
 * @enum
 * 
 * @member mine         Mine is always = -1
 */
export enum cellEnum {
    mine = -1
}

/**
 * @enum
 * 
 * @member unflipped
 * @member flipped
 * @member flagged
 */
export enum flippedCellEnum {
    unflipped,
    flipped,
    flagged
}

/**
 * @enum
 * 
 * @member pending
 * @member inProgress
 * @member won
 * @member lost
 */
export enum gameStatusEnum {
    pending,
    inProgress,
    won,
    lost
}

/**
 * @member id                   ID in difficultyEnum
 * @member name                 Name of difficulty
 * @member mapDimensions        dimensions of cell grid
 * @member noOfMines            Number of mines (total)
 */
export type Difficulty = {
    id: difficultyEnum;
    name: string;
    mapDimensions: { x: number, y: number },
    noOfMines: number;
}