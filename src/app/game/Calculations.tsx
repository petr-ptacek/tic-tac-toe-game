import {GameToken} from "./GameToken";
import {ILocationClick} from "../components/Game";
import {GameResult} from "./GameResult";
import {Direction} from "./Direction";
import {Coords} from "./Coords";

export interface IGameOptions {
    countRows: number;
    countCells: number;
    startPlayer: GameToken;
    rowWinLength: number;
}

export class Calculations {

    /**
     * 1. coordinates {0, 1, ... countRows}
     * 2. coordinates {0, 1, ... countCells}
     * 3. direction {Z, SZ, S, SV}
     * 4. player
     */
    private tokenInRow: number[][][][];

    /**
     * 1. direction {Z, SZ, S, SV}
     * 2. coordinates {X, Y}
     * @type {number[][]}
     */
    private readonly directionSigns: number[][] = [
        [-1, 0],
        [-1, -1],
        [0, -1],
        [1, -1]
    ];

    private currentPlayer: GameToken;
    private readonly rowWinLength: number;
    private countRows: number;
    private countCells: number;

    constructor(gameOptions: IGameOptions) {
        this.countRows = gameOptions.countRows;
        this.countCells = gameOptions.countCells;
        this.currentPlayer = gameOptions.startPlayer;
        this.rowWinLength = gameOptions.rowWinLength;

        this.tokenInRow = this.clearTokensInRow();
    }

    /**
     * Create game table.
     * @returns {GameToken[][]} gameTable
     */

    public createTable(): GameToken[][] {
        const table: GameToken[][] = [];
        let temp: GameToken[] = [],
            i: number, j: number;

        for (i = 0; i < this.countRows; i++) {
            temp = [];
            for (j = 0; j < this.countCells; j++) {
                temp.push(GameToken.EMPTY);
            }
            table[i] = temp;
        }

        return table;
    }

    public addToken(location: ILocationClick, callbackUpdateTable: (location: ILocationClick) => void): GameResult {
        let result: GameResult = GameResult.Continue;
        console.log("X" + location.x + " Y: " + location.y)

        for (let direction = Direction.Z; direction <= Direction.SV; direction++) {
            for (let pos = 0; pos < this.rowWinLength; pos++) {
                let directHor = this.directionSigns[direction][Coords.X];
                let directVer = this.directionSigns[direction][Coords.Y];
                let posX = location.x + pos * directHor;
                let posY = location.y + pos * directVer;

                if (((directHor === -1 && posX >= 0 && posX <= this.countCells - this.rowWinLength) ||
                        (directHor === 1 && posX >= this.rowWinLength - 1 && posX < this.countCells) ||
                        (directHor === 0)) &&
                    ((directVer === -1 && posY >= 0 && posY <= this.countCells - this.rowWinLength) ||
                        (directVer === 1 && posY >= this.rowWinLength - 1 && posY < this.countCells) ||
                        (directVer === 0))) {
                    result = this.includeInsertToken(posX, posY, direction);
                    if (result !== GameResult.Continue) {
                        break;
                    }
                }
            }
            if (result !== GameResult.Continue) {
                break;
            }
        }
        callbackUpdateTable(location);
        return result;
    }

    private clearTokensInRow(): number[][][][] {
        let result: number[][][][] = [];

        for (let i = 0; i < this.countRows; i++) {
            result[i] = [];
            for (let j = 0; j < this.countCells; j++) {
                result[i][j] = [];
                for (let direction = Direction.Z; direction <= Direction.SV; direction++) {
                    result[i][j][direction] = [];
                    for (let token = GameToken.X; token <= GameToken.O; token++) {
                        result[i][j][direction][token] = 0;
                    }
                }
            }
        }
        return result;
    }

    public includeInsertToken(posX: number, posY: number, direction: Direction): GameResult {
        this.tokenInRow[posX][posY][direction][this.currentPlayer]++;
        console.log("Count: " + this.tokenInRow[posX][posY][direction][this.currentPlayer]);
        return this.tokenInRow[posX][posY][direction][this.currentPlayer] === this.rowWinLength ?
            GameResult.Win :
            GameResult.Continue;
    }

    public switchCurrentPlayer(): void {
        this.currentPlayer = this.currentPlayer === GameToken.X ? GameToken.O : GameToken.X;
    }

    public static isInsertedLocationEmpty(location: ILocationClick, table: GameToken[][]): boolean {
        return table[location.x][location.y] === GameToken.EMPTY;
    }

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

    public getRowLength(): number {
        return this.rowWinLength;
    }

    public getCurrentPlayer(): GameToken {
        return this.currentPlayer;
    }

    public getCountRows(): number {
        return this.countRows;
    }

    public setCountRows(value: number): void {
        this.countRows = value;
    }

    public getCountCells(): number {
        return this.countCells;
    }

    public setCountCells(value: number): void {
        this.countCells = value;
    }
}