import * as React from "react";
import {GameToken} from "../game/GameToken";
import {Board} from "./Board";
import {GameResult} from "../game/GameResult";
import {Calculations} from "../game/Calculations";

export interface ILocationClick {
    x: number;
    y: number;
}

export interface IPropsGameData {
    tableSize: number;
    startPlayer: GameToken;
    rowWinLength: number;
}

export interface IStateGameData {
    table: GameToken[][];
}

export class Game extends React.Component<IPropsGameData, IStateGameData> {

    private calculation: Calculations;

    constructor(props: IPropsGameData) {
        super(props);

        this.calculation = new Calculations({
            startPlayer: this.props.startPlayer,
            tableSize: this.props.tableSize,
            rowWinLength: this.props.rowWinLength
        });

        this.state = {
            table: this.calculation.createTable()
        };

    }

    private updateTable(location: ILocationClick): void {
        const tempTable: GameToken[][] = Calculations.deepCopy2dArray<GameToken>(this.state.table);
        tempTable[location.x][location.y] = this.calculation.getCurrentPlayer();
        this.setState(() => {
            return {
                table: tempTable
            }
        });
    }

    private onClickCellHandler(location: ILocationClick) {
        if (!Calculations.isInsertedLocationEmpty(location, this.state.table)) {
            return;
        }

        let gameResult: GameResult = this.calculation.addToken(location, this.updateTable.bind(this));

        if (gameResult === GameResult.Win) {
            document.getElementById('message').innerHTML = "Win: " + this.calculation.getCurrentPlayer();
            return;
        } else if (gameResult === GameResult.Draw) {
            document.getElementById('message').innerHTML = "Draw";
            return;
        }

        this.calculation.switchCurrentPlayer();
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