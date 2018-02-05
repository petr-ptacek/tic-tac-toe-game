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
    playGame: boolean;
    tableWidth: number;
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
            rowWinLength: this.props.rowWinLength,
        });

        this.state = {
            table: this.calculation.createTable()
        };
    }

    componentWillReceiveProps(nextProps: Readonly<IPropsGameData>, nextContext: any): void {
        this.updateComponent(nextProps);
    }

    private updateComponent(nextProps: Readonly<IPropsGameData>) {
        this.calculation = new Calculations({
            startPlayer: nextProps.startPlayer,
            tableSize: nextProps.tableSize,
            rowWinLength: nextProps.rowWinLength
        });

        this.setState(() => {
            return {
                table: this.calculation.createTable()
            }
        });
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
            <div className={"gameComponent"} style={{width: this.props.tableWidth}}>
                <Board table={this.state.table}
                       playGame={this.props.playGame}
                       onClickCellHandler={this.onClickCellHandler.bind(this)}/>
            </div>
        );
    }
}