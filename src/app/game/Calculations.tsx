import {GameToken} from "./GameToken";
import {ILocationClick} from "../components/Game";
import {GameResult} from "./GameResult";
import {Direction} from "./Direction";

export interface IGameOptions {
    tableSize: number;
    startPlayer: GameToken;
    rowWinLength: number;
}

export class Calculations {
    /**
     * The current player.
     */
    private currentPlayer: GameToken;

    /**
     * The length of the line with the same tokens needed to win.
     */
    private readonly rowWinLength: number;

    /**
     * The size of the table in structure tableSize * tableSize
     */
    private readonly tableSize: number;

    private countInsertedTokens: number;

    constructor(gameOptions: IGameOptions) {
        this.tableSize = gameOptions.tableSize;
        this.currentPlayer = gameOptions.startPlayer;
        this.rowWinLength = gameOptions.rowWinLength;
        this.countInsertedTokens = 0;
    }

    /**
     * Create game table.
     * @returns {GameToken[][]} gameTable
     */
    public createTable(): GameToken[][] {
        const table: GameToken[][] = [];
        let temp: GameToken[] = [],
            i: number, j: number;

        for (i = 0; i < this.tableSize; i++) {
            temp = [];
            for (j = 0; j < this.tableSize; j++) {
                temp.push(GameToken.EMPTY);
            }
            table[i] = temp;
        }

        return table;
    }

    /**
     * Checks the game result
     * @param {GameToken[][]} table
     * @param {ILocationClick} location
     * @returns {GameResult}
     */
    public checkGameResult(table: GameToken[][], location: ILocationClick): GameResult {
        let gameResult: GameResult = GameResult.Continue;

        if (this.checkWin(table, location)) {
            gameResult = GameResult.Win;
        }

        if (++this.countInsertedTokens === (this.tableSize * this.tableSize)) {
            gameResult = GameResult.Draw;
        }

        return gameResult;
    }

    /**
     * Check the game state WIN.
     * @param {GameToken[][]} table
     * @param {ILocationClick} location
     * @returns {boolean}
     */
    private checkWin(table: GameToken[][], location: ILocationClick): boolean {
        return this.checkWinHorizontal(table, location) ||
            this.checkWinVertical(table, location) ||
            this.checkWinRightTopToLeftBottom(table, location) ||
            this.checkWinLeftTopToRightBottom(table, location);
    }

    /**
     * Check the game state WIN for LeftTopToRightBottom corner line of clickLocation
     * @param {GameToken[][]} table
     * @param {ILocationClick} location
     * @returns {boolean}
     */
    private checkWinLeftTopToRightBottom(table: GameToken[][], location: ILocationClick): boolean {
        let counter: number = 1,
            posX: number,
            posY: number,
            step: number;

        for (step = 1; step < this.rowWinLength; step++) {
            posX = location.x - step;
            posY = location.y - step;

            if (!this.isInTableRange(posX) || !this.isInTableRange(posY)) {
                break;
            }

            if (table[posX][posY] === this.currentPlayer) {
                counter++;
            } else {
                break;
            }
        }

        for (step = 1; step < this.rowWinLength; step++) {
            posX = location.x + step;
            posY = location.y + step;

            if (!this.isInTableRange(posX) || !this.isInTableRange(posX)) {
                break;
            }

            if (table[posX][posY] === this.currentPlayer) {
                counter++;
            } else {
                break;
            }
        }

        return counter === this.rowWinLength;
    }

    /**
     * Check the game state WIN for RightTopToLeftBottom corner line of clickLocation
     * @param {GameToken[][]} table
     * @param {ILocationClick} location
     * @returns {boolean}
     */
    private checkWinRightTopToLeftBottom(table: GameToken[][], location: ILocationClick): boolean {
        let counter: number = 1,
            posX: number,
            posY: number,
            step: number;

        for (step = 1; step < this.rowWinLength; step++) {
            posY = location.y - step;
            posX = location.x + step;

            if (!this.isInTableRange(posX) || !this.isInTableRange(posY)) {
                break;
            }

            if (table[posX][posY] === this.currentPlayer) {
                counter++;
            } else {
                break;
            }
        }

        for (step = 1; step < this.rowWinLength; step++) {
            posY = location.y + step;
            posX = location.x - step;

            if (!this.isInTableRange(posX) || !this.isInTableRange(posY)) {
                break;
            }

            if (table[posX][posY] === this.currentPlayer) {
                counter++;
            } else {
                break;
            }
        }

        return counter === this.rowWinLength;
    }

    /**
     * Check the game state WIN for vertical line of clickLocation
     * @param {GameToken[][]} table
     * @param {ILocationClick} location
     * @returns {boolean}
     */
    private checkWinVertical(table: GameToken[][], location: ILocationClick): boolean {
        let counter: number = 1,
            posX: number,
            posY: number = location.y,
            step: number;

        // to up from click
        for (step = 1; step < this.rowWinLength; step++) {
            posX = location.x - step;
            if (!this.isInTableRange(posX)) {
                break;
            }

            if (table[posX][posY] === this.currentPlayer) {
                counter++;
            } else {
                break;
            }
        }

        // to down from click
        for (step = 1; step < this.rowWinLength; step++) {
            posX = location.x + step;
            if (!this.isInTableRange(posX)) {
                break;
            }

            if (table[posX][posY] === this.currentPlayer) {
                counter++;
            } else {
                break;
            }
        }

        return counter === this.rowWinLength;
    }

    /**
     * Check the game state WIN for horizontal line of clickLocation
     * @param {GameToken[][]} table
     * @param {ILocationClick} location
     * @returns {boolean}
     */
    private checkWinHorizontal(table: GameToken[][], location: ILocationClick): boolean {
        let counter: number = 1,
            posY: number,
            posX: number = location.x,
            step: number;

        // to left from click
        for (step = 1; step < this.rowWinLength; step++) {
            posY = location.y - step;
            if (!this.isInTableRange(posY)) {
                break;
            }

            if (table[posX][posY] === this.currentPlayer) {
                counter++;
            } else {
                break;
            }
        }

        // to right from click
        for (step = 1; step < this.rowWinLength; step++) {
            posY = location.y + step;
            if (!this.isInTableRange(posY)) {
                break;
            }

            if (table[posX][posY] === this.currentPlayer) {
                counter++;
            } else {
                break;
            }
        }

        return counter === this.rowWinLength;
    }

    /**
     * Resolve, that given index is in the border boundary.
     * @param {number} index
     * @returns {boolean}
     */
    private isInTableRange(index: number): boolean {
        return index >= 0 && index < this.tableSize;
    }

    /**
     * Switch the current player.
     */
    public switchCurrentPlayer(): void {
        this.currentPlayer = this.currentPlayer === GameToken.X ? GameToken.O : GameToken.X;
    }

    /**
     * Recognize if the cell in the particular location is empty.
     * @param {ILocationClick} location
     * @param {GameToken[][]} table
     * @returns {boolean}
     */
    public static isInsertedLocationEmpty(location: ILocationClick, table: GameToken[][]): boolean {
        return table[location.x][location.y] === GameToken.EMPTY;
    }

    /**
     * Deep copy of the 2D array.
     * @param {T[][]} from
     * @returns {T[][]}
     */
    public static deepCopy2dArray<T>(from: T[][]): T[][] {
        let result: T[][] = [];

        for (let i = 0; i < from.length; i++) {
            result[i] = [];
            for (let j = 0; j < from[i].length; j++) {
                result[i][j] = from[i][j];
            }
        }
        return result;
    }

    /***
     * Return the current played player.
     * @returns {GameToken}
     */
    public getCurrentPlayer(): GameToken {
        return this.currentPlayer;
    }
}