import * as React from 'react';
import {GameOptionsForm} from "./GameOptionsForm";
import {Game} from "./Game";
import {GameToken} from "../game/GameToken";
import {Header} from "./Header";

export interface IPropsGameContainer {

}

export interface IStateGameContainer {

}

export class GameContainer extends React.Component<IPropsGameContainer, IStateGameContainer> {
    constructor(props: IPropsGameContainer) {
        super(props);
    }


    render(): React.ReactNode {
        return (
            <div className={"gameContainer"}>
                <Header content={"Tic Tac Toe"}/>
                <div className={"clear-fix"}>
                    <GameOptionsForm/>,
                    <Game tableSize={10} startPlayer={GameToken.O} rowWinLength={5}/>
                </div>
            </div>
        );
    }
}