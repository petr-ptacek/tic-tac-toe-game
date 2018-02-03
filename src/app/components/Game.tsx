import * as React from "react";
import {Board} from "./Board";

export interface IPropsGameData {

}

export interface IStateGameData {

}

export class Game extends React.Component<IPropsGameData, IStateGameData> {
    constructor(props: IPropsGameData) {
        super(props);

    }

    render(): React.ReactNode {
        return (
            <div>
            </div>
        );
    }
}