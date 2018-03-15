import * as React from 'react';
import {GameOptionsForm} from "./GameOptionsForm";
import {Game} from "./Game";
import {GameToken} from "../game/GameToken";
import {Header} from "./Header";
import {GameResult} from "../game/GameResult";
import {GameNotification} from "./GameNotification";
import {Simulate} from "react-dom/test-utils";
import play = Simulate.play;

export interface GameOptionsProperties {
    player1: string;
    player2: string;
    rowWinLength: number;
    tableSize: number;
    playWithComputer: boolean;
    isInputsDisabled: boolean;
    isButtonOKDisabled: boolean;
    isButtonCancelDisabled: boolean;
    btnOKText: string;
    btnCancelText: string;
}

export interface IPropsGameContainer {
}

export interface IStateGameContainer extends GameOptionsProperties {
    playGame: boolean;
    isWinOrDraw: boolean;
    gameNotification: string;
    createNewCalculationInstance: boolean;
}

export class GameContainer extends React.Component<IPropsGameContainer, IStateGameContainer> {
    constructor(props: IPropsGameContainer) {
        super(props);
        this.state = {
            btnCancelText: "END GAME",
            btnOKText: "PLAY GAME",
            isButtonCancelDisabled: true,
            isButtonOKDisabled: false,
            isInputsDisabled: false,
            player1: "X",
            player2: "O",
            playWithComputer: false,
            rowWinLength: 5,
            tableSize: 5,
            playGame: false,
            isWinOrDraw: false,
            createNewCalculationInstance: true,
            gameNotification: "To start game, click to Play Game."
        }
    }

    private onGameStateChangeHandler(gameResult: GameResult, currentPlayer: GameToken) {

        switch (gameResult) {
            case GameResult.Win:
                this.setState(() => {
                    return {
                        gameNotification: ("Win Player: " + (currentPlayer === GameToken.O ? "O" : "X")),
                        playGame: false,
                        isWinOrDraw: true,
                        isButtonCancelDisabled: true,
                        isButtonOKDisabled: false,
                        isInputsDisabled: false,
                        createNewCalculationInstance: true,
                    };
                });
                break;
            case  GameResult.Draw:
                this.setState(() => {
                    return {
                        gameNotification: "Hops, the game is Draw.",
                        playGame: false,
                        isWinOrDraw: true,
                        isInputsDisabled: false,
                        isButtonCancelDisabled: true,
                        isButtonOKDisabled: false,
                        createNewCalculationInstance: true
                    }
                });
                break;
            case GameResult.Continue:
                this.setState(() => {
                    return {
                        gameNotification: "Current player: " + (currentPlayer === GameToken.O ? "O" : "X"),
                        createNewCalculationInstance: false
                    }
                });
                break;
            default:
                break;
        }
    }

    private gameStart() {
        this.setState(() => {
            return {
                gameNotification: "Current player: " + this.state.player1,
                playGame: true,
                isWinOrDraw: false,
                isButtonOKDisabled: true,
                isInputsDisabled: true,
                isButtonCancelDisabled: false
            }
        });
    }

    private gameEnd() {
        this.setState(() => {
            return {
                gameNotification: "To start game, click to Play Game.",
                playGame: false,
                isButtonCancelDisabled: true,
                isInputsDisabled: false,
                isButtonOKDisabled: false,
                createNewCalculationInstance: true
            }
        });
    }

    /**
     * If is clicked on the button.
     * @param {string} id identification of the button.
     */
    private onButtonClickHandler(id: string) {
        switch (id) {
            case "#btn-ok":
                this.gameStart();
                break;
            case "#btn-cancel":
                this.gameEnd();
                break;
        }
    }

    /**
     * If any input is changed from user, there is the handler.
     * @param {string} id identification of which input has been changed
     * @param {string} value the new changed value
     */
    private onChangeInputHandler(id: string, value: string) {
        switch (id) {
            case "#table-size":
                this.setState(() => {
                    return {
                        tableSize: parseInt(value, 10)
                    };
                });
                break;
            case "#tokens-in-row":
                this.setState(() => {
                    return {
                        rowWinLength: parseInt(value, 10)
                    };
                });
                break;
            case "#player-1":
                this.setState(() => {
                    return {
                        player1: value === "X" ? "X" : "O",
                        player2: value === "X" ? "O" : "X"
                    };
                });
                break;
            case "#player-2":
                this.setState(() => {
                    return {
                        player1: value === "X" ? "O" : "X",
                        player2: value === "X" ? "X" : "O"
                    };
                });
                break;
        }

        if (this.state.isWinOrDraw) {
            this.setState(() => {
                return {
                    gameNotification: "To start game, click to Play Game."
                };
            });
        }
    }

    /**
     * Calculate the width of the table.
     * @returns {number}
     */
    private calculateTableWidth() {
        return (this.state.tableSize * 34) - this.state.tableSize;
    }

    render(): React.ReactNode {
        const tableWidth = this.calculateTableWidth();

        return (
            <div className={"gameContainer"}>
                <Header content={"Tic Tac Toe"}/>
                <div className={"clear-fix"}>
                    <GameOptionsForm player1={this.state.player1}
                                     player2={this.state.player2}
                                     rowWinLength={this.state.rowWinLength}
                                     tableSize={this.state.tableSize}
                                     playWithComputer={this.state.playWithComputer}
                                     isButtonCancelDisabled={this.state.isButtonCancelDisabled}
                                     isButtonOKDisabled={this.state.isButtonOKDisabled}
                                     isInputsDisabled={this.state.isInputsDisabled}
                                     onButtonClickHandler={this.onButtonClickHandler.bind(this)}
                                     onChangeInputHandler={this.onChangeInputHandler.bind(this)}
                                     btnOKText={this.state.btnOKText}
                                     btnCancelText={this.state.btnCancelText}
                    />
                    <Game tableSize={this.state.tableSize}
                          playGame={this.state.playGame}
                          isWinOrDraw={this.state.isWinOrDraw}
                          startPlayer={this.state.player1 === "X" ? GameToken.X : GameToken.O}
                          rowWinLength={this.state.rowWinLength}
                          tableWidth={tableWidth}
                          createNewCalculationInstance={this.state.createNewCalculationInstance}
                          onGameStateChangeHandler={this.onGameStateChangeHandler.bind(this)}
                    />
                    <GameNotification cssClasses={"game-notification"}
                                      content={this.state.gameNotification}
                    />
                </div>
            </div>
        );
    }
}