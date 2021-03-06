import * as React from "react";
import {GameToken} from "../game/GameToken";
import {Board} from "./Board";
import {GameResult} from "../game/GameResult";
import {Calculations} from "../game/Calculations";

/**
 * Localization of the click, on which cell was clicked. Cell is save in 2d array,
 * when I click on the cell, the cell has own id = {0, ... n - 1}, this is my identificator
 * of the cell. The row id is saved in the row, and here comming the x and y.
 */
export interface ILocationClick {
    x: number;
    y: number;
}

/**
 * Game data.
 * tableSize = tableSize * tableSize => table n * n, square
 * start player, the player, who start the game, it is two options X and O
 * rowWin - the number of the same symbols to win
 * tableWidth is only for screen and style purpose
 */
export interface IPropsGameData {
    tableSize: number;
    startPlayer: GameToken;
    rowWinLength: number;
    playGame: boolean;
    tableWidth: number;
    createNewCalculationInstance: boolean;
    isWinOrDraw: boolean;
    onGameStateChangeHandler: (gameResult: GameResult, player?: GameToken) => void;
}

/**
 * The structure how the game is saved in memory. 2d array
 */
export interface IStateGameData {
    table: GameToken[][];
}

export class Game extends React.Component<IPropsGameData, IStateGameData> {

    /**
     * Logic mathematication game is here.
     */
    private calculation: Calculations;

    /**
     * Indicator if the game is in the state win or draw.
     */
    private isWinOrDraw: boolean;

    constructor(props: IPropsGameData) {
        super(props);
        this.isWinOrDraw = false;
        this.createCalculation(props);
        this.state = {
            table: this.calculation.createTable()
        };
    }

    /**
     * Very important method. It is create new instance of table, only the game is in state play.
     * And if is detected the win or draw, the instance of table is not created.
     * @param {Readonly<IPropsGameData>} nextProps
     * @param nextContext
     */
    componentWillReceiveProps(nextProps: Readonly<IPropsGameData>, nextContext: any): void {
        if (!nextProps.playGame && this.props.isWinOrDraw === nextProps.isWinOrDraw) {
            this.reinitializedCalculation(nextProps);
        }

        if (this.props.isWinOrDraw) {
            this.reinitializedCalculation(nextProps);
        }
    }

    /**
     * Create new Calculation instance.
     */
    private createCalculation(props: Readonly<IPropsGameData>) {
        this.calculation = new Calculations({
            startPlayer: props.startPlayer,
            tableSize: props.tableSize,
            rowWinLength: props.rowWinLength
        });
    }

    /**
     * When the game options are changed, e.g. the tableSize is changed, it is need create new 2D array in memory
     * @param {Readonly<IPropsGameData>} nextProps
     */
    private reinitializedCalculation(nextProps: Readonly<IPropsGameData>) {
        this.createCalculation(nextProps);
        this.setState(() => {
            return {
                table: this.calculation.createTable()
            }
        });
    }

    /**
     * Insert the gameToken to the table on the particular position.
     * @param {ILocationClick} location
     */
    private updateTable(location: ILocationClick): void {
        const tempTable: GameToken[][] = Calculations.deepCopy2dArray<GameToken>(this.state.table);
        tempTable[location.x][location.y] = this.calculation.getCurrentPlayer();
        this.setState(() => {
            return {
                table: tempTable
            }
        });
    }

    /**
     * Click handler.
     * @param {ILocationClick} location location of the particular cell
     **/
    private onClickCellHandler(location: ILocationClick) {
        if (!Calculations.isInsertedLocationEmpty(location, this.state.table)) {
            return;
        }

        let gameResult: GameResult = this.calculation.checkGameResult(this.state.table, location);

        this.updateTable(location);

        /**
         * I need change the player, only if the game is in the state of CONTINUE
         */
        if (gameResult === GameResult.Continue) {
            this.calculation.switchCurrentPlayer();
        }

        this.props.onGameStateChangeHandler(gameResult, this.calculation.getCurrentPlayer());
    }

    /**
     * Rendering Component.
     * @returns {React.ReactNode}
     */
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