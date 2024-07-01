import { Difficulty, difficultyEnum } from "./MinesweeperWindow.types";

/**
 * Define difficulties for minesweeper game
 */
export const DIFFICULTIES: Record<difficultyEnum, Difficulty> = {
    [difficultyEnum.easy]: {
        id: difficultyEnum.easy,
        name: 'Easy',
        mapDimensions: {
            x: 10,
            y: 10
        },
        noOfMines: 20
    },
    [difficultyEnum.intermediate]: {
        id: difficultyEnum.intermediate,
        name: 'Intermediate',
        mapDimensions: {
            x: 16,
            y: 16
        },
        noOfMines: 40
    },
    [difficultyEnum.hard]: {
        id: difficultyEnum.hard,
        name: 'Hard',
        mapDimensions: {
            x: 24,
            y: 24
        },
        noOfMines: 80
    },
    [difficultyEnum.expert]: {
        id: difficultyEnum.expert,
        name: 'Expert',
        mapDimensions: {
            x: 32,
            y: 32
        },
        noOfMines: 120
    }
}