import * as React from "react";
import {GameToken} from "../game/GameToken";
import {Board} from "./Board";

export interface ILocationClick {
    row: number;
    cell: number;
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

    constructor(props: IPropsGameData) {
        super(props);

        this.currentPlayer = this.props.startPlayer;
        this.state = {
            table: this.createTable()
        }
    }

    private switchCurrentPlayer(): void {
        this.currentPlayer = this.currentPlayer === GameToken.X ? GameToken.O : GameToken.X;
    }

    private isInsertedLocationEmpty(location: ILocationClick): boolean {
        const token = this.state.table[location.row][location.cell];
        return token === GameToken.EMPTY;
    }

    private updateTable(location: ILocationClick, player: GameToken): void {
        if (!this.isInsertedLocationEmpty(location)) {
            return;
        }

        const tempTable = this.state.table.slice();
        tempTable[location.row][location.cell] = player;
        this.switchCurrentPlayer();

        this.setState(() => {
            return {
                table: tempTable
            }
        });
    }

    private onClickCellHandler(location: ILocationClick) {
        this.updateTable(location, this.currentPlayer);
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