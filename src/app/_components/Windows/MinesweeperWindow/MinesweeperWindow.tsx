'use client';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IWindowComponentProps } from '../../SystemContext/_static/windows/windows.types';
import { WindowToolbar } from '../WindowToolbar/WindowToolbar';
import { MinesweeperTimer } from './MinesweeperTimer/MinesweeperTimer';
import { Difficulty, cellEnum, difficultyEnum, flippedCellEnum, gameStatusEnum } from './MinesweeperWindow.types';
import { getCellContents, isValidCell } from './utils/MinesweeperWindowUtils';
import { MinesweeperLcd } from './MinesweeperLcd/MinesweeperLcd';
import { SystemContext } from '../../SystemContext/SystemContext';
import { DIFFICULTIES } from './MinesweeperWindow.static';
import Image from 'next/image';

// ICONS
import SmileIconInProgress from '../../../_static/icons/png/utopia_smiley.png';
import SmileIconWon from '../../../_static/icons/png/utopia_smiley-sunglasses.png';
import SmileIconLost from '../../../_static/icons/png/utopia_smiley-dead.png';

/**
 * Simple clone of the Windows 98 version of minesweeper
 * Selectable difficulty, flagging and timer
 * 
 * @param props             Standard window component props 
 * @returns Component
 */
export const MinesweeperWindow = (props: IWindowComponentProps) => {

    // CONTEXT
    const { handleSetWindowPosition } = useContext(SystemContext);

    // STATE
    /**
     * Status of the game (i.e. in progress, won, lost etc)
     */
    const [gameStatus, setGameStatus] = useState<gameStatusEnum>(gameStatusEnum.pending);

    /**
     * Current map of mine locations
     * Two-deep nested arrays
     */
    const [mineMap, setMineMap] = useState<number[][]>([[]]);

    /**
     * Cell flipped/flagged status, as two-deep nested array as in mineMap
     * @see minMap
     */
    const [flippedCells, setFlippedCells] = useState<flippedCellEnum[][]>([[]]);

    /**
     * Current difficulty as object
     * Sets values such as number of mines and size of map
     */
    const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[difficultyEnum.easy])

    // HANDLERS
    /**
     * Sets up the game
     * 1. Resets status to pending
     * 2. Resets all flipped cells
     * 3. Generates new board/mines
     */
    const handleSetupBoard = () => {
        setGameStatus(gameStatusEnum.pending);
        resetFlippedCells();
        generateMines();
    }

    /**
     * Updates the difficulty, and resets the board
     * 
     * @param newDifficulty 
     */
    const handleSetDifficulty = useCallback((newDifficulty: difficultyEnum) => {
        setDifficulty(DIFFICULTIES[newDifficulty]);
        handleSetupBoard();
    }, []);

    /**
     * On change of difficulty, reset the game and resize the window to reflect the new board dimensions
     */
    useEffect(() => {
        handleSetupBoard();

        handleSetWindowPosition(props.instanceId, {
            h: (difficulty.mapDimensions.y * 16) + 38 + 32 + 32 + 24 + 24,
            w: (difficulty.mapDimensions.x * 16) + 32 + 24
        })
    }, [difficulty]);

    /**
     * Clear flippedCells and reset to default values
     */
    const resetFlippedCells = () => {

        const newFlippedCells: flippedCellEnum[][] = new Array(difficulty.mapDimensions.y);
        for(let i = 0; i < difficulty.mapDimensions.y; i++) {
            newFlippedCells[i] = new Array(difficulty.mapDimensions.x).fill(flippedCellEnum.unflipped, 0, difficulty.mapDimensions.x);
        }

        setFlippedCells(newFlippedCells);
    }

    /**
     * Generate a number of mines equal to the noOfMines value in current difficulty
     */
    const generateMines = useCallback(() => {

        let mineMapCopy = new Array(difficulty.mapDimensions.y);
        for(let i = 0; i < difficulty.mapDimensions.y; i++) {
            mineMapCopy[i] = new Array(difficulty.mapDimensions.x).fill(0, 0, difficulty.mapDimensions.x);
        }

        const putRandomMine = (): void => {
            // Determine randoms
            const randomRowIndex = Math.floor(Math.random() * mineMapCopy.length);
            const randomColumnIndex = Math.floor(Math.random() * mineMapCopy[randomRowIndex].length);

            // If mine already exists in spot, reroll
            if(mineMapCopy[randomRowIndex][randomColumnIndex] === cellEnum.mine) {
                putRandomMine();
                return;
            }

            // create mine :^)
            mineMapCopy[randomRowIndex][randomColumnIndex] = cellEnum.mine;

            const ops: [number, number][] = [
                // left/right
                [0, 1],
                [0, -1],
                
                // top/bottom
                [1, 0],
                [-1, 0],

                // diagonals down
                [1, 1],
                [1, -1],

                // Diagonals up
                [-1, -1],
                [-1, 1]
            ];

            ops.forEach((op) => {
                const targetRowIndex = randomRowIndex + op[0];
                const targetColumnIndex = randomColumnIndex + op[1];

                if(isValidCell(mineMapCopy, targetRowIndex, targetColumnIndex)) {
                    mineMapCopy[targetRowIndex][targetColumnIndex] = mineMapCopy[targetRowIndex][targetColumnIndex] + 1;
                }

            })
        }

        // Create mines
        for(let i = 0; i < difficulty.noOfMines; i++) {
            putRandomMine();
        }

        setMineMap(mineMapCopy);

    }, [difficulty, mineMap]);

    /**
     * Handler for clicking on a mine
     * 
     * If mine is flagged, do nothing
     * If already flipped, do nothing
     * Otherwise, flip cell
     * 
     * @param rowIndex 
     * @param columnIndex 
     * @returns 
     */
    const handleClickCoordinate = (rowIndex: number, columnIndex: number) => {

        // Set game status to in progress if not already
        if(gameStatus !== gameStatusEnum.inProgress) {
            setGameStatus(gameStatusEnum.inProgress);
        }

        // Cell is already flipped, or is flagged
        if(
            flippedCells[rowIndex]?.[columnIndex] === flippedCellEnum.flagged ||
            flippedCells[rowIndex]?.[columnIndex] === flippedCellEnum.flagged 
        ) {
            return
        }

        // Flip cell
        setFlippedCells((prevState) => {
            const copy = [...prevState];
            
            if(copy[rowIndex]?.[columnIndex] !== undefined) {
                copy[rowIndex][columnIndex] = flippedCellEnum.flipped;
            }

            return copy;
        
        })

        // Check if mine!
        const coordHasMine = mineMap[rowIndex][columnIndex] === cellEnum.mine;

        if(coordHasMine) {
            setGameStatus(gameStatusEnum.lost);
            return;
        }

        // Define which cells are going to be 'cleared' (flipped)
        const newFlippedCells = [...flippedCells];

        // Flip the clicked cell regardless
        if(newFlippedCells[rowIndex]?.[columnIndex] !== undefined) {
            newFlippedCells[rowIndex][columnIndex] = 1;
        }

        // Define func to clear adjacent cells of given cell by row/cell index
        const clearAdjacentCells = (rowIndex: number, columnIndex: number) => {

            if(!isValidCell(mineMap, rowIndex, columnIndex)) {
                return
            }

            const ops: [number, number][] = [
                // left/right
                [0, 1],
                [0, -1],
                
                // top/bottom
                [1, 0],
                [-1, 0],

                // diagonals down
                [1, 1],
                [1, -1],

                // Diagonals up
                [-1, -1],
                [-1, 1]
            ];

            ops.forEach((op) => {

                const targetRowIndex = rowIndex + op[0];
                const targetCellIndex = columnIndex + op[1];

                // Check if cell has already been flipped
                if(newFlippedCells[targetRowIndex]?.[targetCellIndex]) {
                    return
                }

                if(isValidCell(mineMap, targetRowIndex, targetCellIndex)) {

                    const cell = mineMap[targetRowIndex][targetCellIndex];

                    if(cell === cellEnum.mine) {
                        return;
                    }

                    // mark cell as cleared
                    newFlippedCells[targetRowIndex][targetCellIndex] = flippedCellEnum.flipped;

                    // Cell has no adjacent mines, continue sweeping
                    if(cell === 0) {
                        clearAdjacentCells(targetRowIndex, targetCellIndex);
                    }
                }
            });

        }

        // If cell has value of 0, clear adjacent
        if(mineMap[rowIndex][columnIndex] === 0) {
            clearAdjacentCells(rowIndex, columnIndex);
        }

        setFlippedCells(newFlippedCells);
        
    }

    /**
     * Handles setting a cells status to 'flagged'
     * 
     * @param e 
     * @param rowIndex 
     * @param columnIndex 
     */
    const handleFlagCell = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, rowIndex: number, columnIndex: number) => {
        
        e.preventDefault();

        const clickedCell = flippedCells[rowIndex]?.[columnIndex];

        const newFlippedCells = [...flippedCells];

        switch(clickedCell) {
            case flippedCellEnum.unflipped: {
                newFlippedCells[rowIndex][columnIndex] = flippedCellEnum.flagged;
                break;
            }
            case flippedCellEnum.flipped: {
                break;
            }
            case flippedCellEnum.flagged: {
                newFlippedCells[rowIndex][columnIndex] = flippedCellEnum.unflipped
            }
        }

        setFlippedCells(newFlippedCells);

    }

    /**
     * Metadata for display in the top bar
     */
    const computedFlippedCellsMeta = useMemo(() => {

        let flaggedCount = 0;
        let unflippedCount = 0;

        for(let i = 0; i < flippedCells.length; i++) {
            for(let ci = 0; ci < flippedCells[i].length; ci++) {
                if(flippedCells[i][ci] === flippedCellEnum.flagged) {
                    flaggedCount++;
                }
                else if(flippedCells[i][ci] === flippedCellEnum.unflipped) {
                    unflippedCount++;
                } 
            }
        }


        return {
            remainingFlags: difficulty.noOfMines - flaggedCount,
            unflippedCount
        }

    }, [flippedCells, difficulty.noOfMines]);

    /**
     * Determine if game has been won, by check if the only remaining unflipped cells are all mines
     */
    useEffect(() => {
        if(computedFlippedCellsMeta.unflippedCount === difficulty.noOfMines) {
            setGameStatus(gameStatusEnum.won);
        }
    }, [computedFlippedCellsMeta]);

    /**
     * Determines which smiley to show based on game status
     * 
     * @returns A smiley dependent on game status
     */
    const getSmileIcon = () => {
        switch(gameStatus) {
            case gameStatusEnum.pending:
            case gameStatusEnum.inProgress: {
                return SmileIconInProgress
            }
            case gameStatusEnum.won: {
                return SmileIconWon
            }
            case gameStatusEnum.lost: {
                return SmileIconLost
            }
            default: {
                return SmileIconInProgress
            }
        }
    }

    return (
        <div className='flex flex-col h-max w-max'>

            {/* WINDOW TOOLBAR */}
            <WindowToolbar 
                items={[
                    {
                        name: 'Difficulty',
                        options: Object.entries(DIFFICULTIES).map(([key, value]) => (
                            {
                                name: value.name,
                                action: () => handleSetDifficulty(value.id)
                            }
                        ))
                    }
                ]}
            />

        <div
            className='win-bezel-thick p-4 h-full'
            style={{
                display: 'grid',
                gridTemplateColumns: 'max-content',
                gridTemplateRows: 'max-content max-content',
                gap: '4px'
            }}
        >
            {/* CONTROL BAR */}
            <div
                className='flex justify-between items-center p-1.5 win-bezel-thick-inverted h-max'
            >
              
                {/* NO OF FLAGS */}
                <MinesweeperLcd text={('000' + computedFlippedCellsMeta.remainingFlags).slice(-3)} />

                {/* RESET BUTTON */}
                <button 
                    className='icon-button !p-0.5 w-max' 
                    onClick={handleSetupBoard}
                >
                    <Image alt='' src={getSmileIcon()} width={24} height={24} style={{ imageRendering: 'pixelated' }} />    
                </button>

                {/* GAME TIMER */}
                <MinesweeperTimer gameStatus={gameStatus} />
            </div>
          
            {/* GAME BOARD */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateRows: `repeat(${mineMap.length}, max-content)`,
                    gridTemplateColumns: `repeat(${mineMap[0].length}, max-content)`
                }}
            >
                {
                    mineMap.map((row, rowIndex) => {

                        if(!Array.isArray(row)) {
                            return null
                        }

                        return (
                            row.map((column, columnIndex) => {

                                const isFlipped = flippedCells[rowIndex]?.[columnIndex] === flippedCellEnum.flipped;

                                return (
                                    <button 
                                        key={`${rowIndex}-${columnIndex}-${isFlipped}`}
                                        // TODO -> improve this className
                                        className={`${(isFlipped || (gameStatus === gameStatusEnum.won || gameStatus === gameStatusEnum.lost)) ? 'border' : 'icon-button'} w-4 h-4 flex justify-center items-center`}
                                        onClick={() => handleClickCoordinate(rowIndex, columnIndex)}
                                        onContextMenu={(e) => handleFlagCell(e, rowIndex, columnIndex)}
                                    >
                                        {
                                            getCellContents(column, flippedCells[rowIndex]?.[columnIndex], gameStatus)
                                        }
                                    </button>
                                )

                            })
                        )

                    })
                }
            </div>
        </div>
        </div>
       
    )

}
