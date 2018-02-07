import {GameToken} from "./GameToken";
import {ILocationClick} from "../components/Game";
import {GameResult} from "./GameResult";
import {Direction} from "./Direction";
import {Coords} from "./Coords";

export interface IGameOptions {
    tableSize: number;
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
    private readonly tableSize: number;
    private totalRowsCount: number;

    constructor(gameOptions: IGameOptions) {
        this.tableSize = gameOptions.tableSize;
        this.currentPlayer = gameOptions.startPlayer;
        this.rowWinLength = gameOptions.rowWinLength;

        this.totalRowsCount = 4 * ((2 * this.tableSize - (this.rowWinLength - 1)) *
            (this.tableSize - (this.rowWinLength - 1)));

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

        for (i = 0; i < this.tableSize; i++) {
            temp = [];
            for (j = 0; j < this.tableSize; j++) {
                temp.push(GameToken.EMPTY);
            }
            table[i] = temp;
        }

        return table;
    }

    public addToken(location: ILocationClick, callbackUpdateTable: (location: ILocationClick) => void): GameResult {
        let result: GameResult = GameResult.Continue;

        for (let direction = Direction.Z; direction <= Direction.SV; direction++) {
            for (let pos = 0; pos < this.rowWinLength; pos++) {
                let directHor = this.directionSigns[direction][Coords.X];
                let directVer = this.directionSigns[direction][Coords.Y];
                let posX = location.x + pos * directHor;
                let posY = location.y + pos * directVer;

                if (((directHor === -1 && posX >= 0 && posX <= this.tableSize - this.rowWinLength) ||
                        (directHor === 1 && posX >= this.rowWinLength - 1 && posX < this.tableSize) ||
                        (directHor === 0)) &&
                    ((directVer === -1 && posY >= 0 && posY <= this.tableSize - this.rowWinLength) ||
                        (directVer === 1 && posY >= this.rowWinLength - 1 && posY < this.tableSize) ||
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

        if (result === GameResult.Continue && this.totalRowsCount <= 0)
            result = GameResult.Draw;

        return result;
    }

    private clearTokensInRow(): number[][][][] {
        let result: number[][][][] = [];

        for (let i = 0; i < this.tableSize; i++) {
            result[i] = [];
            for (let j = 0; j < this.tableSize; j++) {
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

        if (this.tokenInRow[posX][posY][direction][this.currentPlayer] === 1)
            this.totalRowsCount--;

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

    public getCurrentPlayer(): GameToken {
        return this.currentPlayer;
    }
}