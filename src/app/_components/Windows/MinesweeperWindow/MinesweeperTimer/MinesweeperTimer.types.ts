import { gameStatusEnum } from "../MinesweeperWindow.types";

/**
 * @interface
 * 
 * @member gameStatus       Status of the game
 */
export interface IMinesweeperTimerProps {
    gameStatus: gameStatusEnum;
}