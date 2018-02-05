import * as React from 'react';
import {GameOptionsForm} from "./GameOptionsForm";
import {Game} from "./Game";
import {GameToken} from "../game/GameToken";
import {Header} from "./Header";

export interface GameOptionsProperties {
    player1: GameToken;
    player2: GameToken;
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
            player1: GameToken.X,
            player2: GameToken.O,
            playWithComputer: false,
            rowWinLength: 5,
            tableSize: 5,
            playGame: false
        }
    }

    private onButtonClickHandler(id: string) {
        switch (id) {
            case "#btn-ok":
                this.setState(() => {
                    return {
                        playGame: true,
                        isButtonOKDisabled: true,
                        isInputsDisabled: true,
                        isButtonCancelDisabled: false
                    }
                });
                break;
            case "#btn-cancel":
                this.setState(() => {
                    return {
                        playGame: false,
                        isButtonCancelDisabled: true,
                        isInputsDisabled: false,
                        isButtonOKDisabled: false
                    }
                });
                break;
        }
    }

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
                        player1: value === "X" ? GameToken.X : GameToken.O,
                        player2: value === "X" ? GameToken.O : GameToken.X
                    };
                });
                break;
            case "#player-2":
                this.setState(() => {
                    return {
                        player1: value === "X" ? GameToken.O : GameToken.X,
                        player2: value === "X" ? GameToken.X : GameToken.O
                    };
                });
                break;
        }
    }

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
                          startPlayer={this.state.player1}
                          rowWinLength={this.state.rowWinLength}
                          tableWidth={tableWidth}
                    />
                </div>
            </div>
        );
    }
}