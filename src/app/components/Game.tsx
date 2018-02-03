import * as React from "react";
import {GameToken} from "../game/GameToken";
import {Board} from "./Board";

export interface ILocationClick {
    row: number;
    cell: number;
}

export interface IPropsGameData {
    countRows: number,
    countCells: number
}

export interface IStateGameData {
    table: GameToken[][];
}

export class Game extends React.Component<IPropsGameData, IStateGameData> {
    constructor(props: IPropsGameData) {
        super(props);

        this.state = {
            table: this.createTable()
        }
    }

    private onClickCellHandler(location: ILocationClick) {
        this.setState((prevState => {
            const tempTable = prevState.table.slice();
            tempTable[location.row][location.cell] = GameToken.O;

            return {
                table: tempTable
            }
        }));
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