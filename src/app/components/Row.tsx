import '../css/row.css'

import * as React from "react";
import { GameToken } from "../game/GameToken";
import {Cell} from "./Cell";


export interface IPropsRowData {
    token: GameToken;
    countCells: number
}

export interface IStateRowData {
}

export class Row extends React.Component<IPropsRowData, IStateRowData> {
    constructor(props: IPropsRowData) {
        super(props);
    }

    private createCells (): Array<React.ReactNode> {
        let cells: Array<React.ReactNode> = [];
        for (let i = 0; i < this.props.countCells; i++) {
            cells.push(
                <Cell key={i} token={this.props.token}/>
            )
        }
        return cells;
    }

    render(): React.ReactNode {
        return (
            <div className={"tic-tac-toe-row"}>
                {this.createCells()}
            </div>
        );
    }
}