import * as React from "react";
import {GameToken} from "../game/GameToken";
import {Board} from "./Board";
import {GameResult} from "../game/GameResult";
import {Direction} from "../game/Direction";
import {Coords} from "../game/Coords";

export interface ILocationClick {
    x: number;
    y: number;
}

export interface IPropsGameData {
    countRows: number;
    countCells: number;
    startPlayer: GameToken;
}

export interface IStateGameData {
    table: GameToken[][];
}

export class Game extends React.Component<IPropsGameData, IStateGameData> {
    private currentPlayer: GameToken;
    private readonly rowLength = 5;

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

    constructor(props: IPropsGameData) {
        super(props);

        this.currentPlayer = this.props.startPlayer;
        this.state = {
            table: this.createTable()
        };

        this.tokenInRow = this.clearTokensInRow();
    }

    private clearTokensInRow(): number[][][][] {
        let result: number[][][][] = [];

        for (let i = 0; i < this.props.countRows; i++) {
            result[i] = [];
            for (let j = 0; j < this.props.countCells; j++) {
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

    private addToken(location: ILocationClick): GameResult {
        let result: GameResult = GameResult.Continue;

        for (let direction = Direction.Z; direction <= Direction.SV; direction++) {
            for (let pos = 0; pos < this.rowLength; pos++) {
                let directHor = this.directionSigns[direction][Coords.X];
                let directVer = this.directionSigns[direction][Coords.Y];
                let posX = location.x + pos * directHor;
                let posY = location.y + pos * directVer;

                if (((directHor === -1 && posX >= 0 && posX <= this.props.countCells - this.rowLength) ||
                        (directHor === 1 && posX >= this.rowLength - 1 && posX < this.props.countCells) ||
                        (directHor === 0)) &&
                    ((directVer === -1 && posY >= 0 && posY <= this.props.countCells - this.rowLength) ||
                        (directVer === 1 && posY >= this.rowLength - 1 && posY < this.props.countCells) ||
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
        this.updateTable(location);
        return result;
    }

    private includeInsertToken(posX: number, posY: number, direction: Direction): GameResult {
        this.tokenInRow[posX][posY][direction][this.currentPlayer]++;
        return this.tokenInRow[posX][posY][direction][this.currentPlayer] === this.rowLength ?
            GameResult.Win :
            GameResult.Continue;
    }

    private switchCurrentPlayer(): void {
        this.currentPlayer = this.currentPlayer === GameToken.X ? GameToken.O : GameToken.X;
    }

    private isInsertedLocationEmpty(location: ILocationClick): boolean {
        return this.state.table[location.x][location.y] === GameToken.EMPTY;
    }

    private static deepCopy2dArray<T>(from: T[][]): T[][] {
        let result: T[][] = [];

        for (let i = 0; i < from.length; i++) {
            result[i] = [];
            for (let j = 0; j < from[i].length; j++) {
                result[i][j] = from[i][j];
            }
        }
        return result;
    }

    private updateTable(location: ILocationClick): void {
        const tempTable: GameToken[][] = Game.deepCopy2dArray<GameToken>(this.state.table);
        tempTable[location.x][location.y] = this.currentPlayer;
        this.setState(() => {
            return {
                table: tempTable
            }
        });
    }

    private onClickCellHandler(location: ILocationClick) {
        if (!this.isInsertedLocationEmpty(location)) {
            return;
        }

        let gameResult: GameResult = this.addToken(location);

        if (gameResult === GameResult.Win) {
            document.getElementById('message').innerHTML = "Win: " + this.currentPlayer;
            return;
        }

        this.switchCurrentPlayer();
    }

    /**
     * Create game table.
     * @returns {GameToken[][]} gameTable
     */

    private createTable(): GameToken[][] {
        const table: GameToken[][] = [];
        let temp: GameToken[] = [],
            i: number, j: number;

        for (i = 0; i < this.props.countRows; i++) {
            temp = [];
            for (j = 0; j < this.props.countCells; j++) {
                temp.push(GameToken.EMPTY);
            }
            table[i] = temp;
        }

        return table;
    }

    render(): React.ReactNode {
        return (
            <div>
                <Board table={this.state.table}
                       onClickCellHandler={this.onClickCellHandler.bind(this)}/>
            </div>
        );
    }
}