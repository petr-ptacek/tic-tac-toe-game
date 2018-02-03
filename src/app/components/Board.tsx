import * as React from "react";
import {Row} from "./Row";
import {GameToken} from "../game/GameToken";


export interface IPropsBoardData {
    countRows: number;
    countCells: number;
}

export interface IStateBoardData {

}

export class Board extends React.Component<IPropsBoardData, IStateBoardData> {
    constructor(props: IPropsBoardData) {
        super(props);
    }

    /**
     * Crate a particular number of rows Components.
     * @returns {Array<React.ReactNode>}
     */
    private createRows(): Array<React.ReactNode> {
        const rows: Array<React.ReactNode> = [];
        for (let i = 0; i < this.props.countRows; i++) {
            rows.push(
                <Row key={i}
                     token={GameToken.O}
                     countCells={this.props.countCells}
                />
            );
        }
        return rows;
    }

    render(): React.ReactNode {
        return (
            <div>
                {this.createRows()}
            </div>
        );
    }
}