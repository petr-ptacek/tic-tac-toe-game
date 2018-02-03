import * as React from "react";
import {Row} from "./Row";
import {GameToken} from "../game/GameToken";
import {ILocationClick} from "./Game";

export interface IPropsBoardData {
    table: GameToken[][];
    onClickCellHandler: (location: ILocationClick) => void;
}

export interface IStateBoardData {

}

export class Board extends React.Component<IPropsBoardData, IStateBoardData> {
    constructor(props: IPropsBoardData) {
        super(props);
    }

    /**
     * Callback, if is clicked on the cell, this method is called in RowComponent.
     * @param {number} rowId location of the row
     * @param {number} cellId location of the cell
     */
    private onClickCellHandler(rowId: number, cellId: number) {
        const location: ILocationClick = {
            row: rowId,
            cell: cellId
        };
        this.props.onClickCellHandler(location);
    }

    private createRows(): Array<React.ReactNode> {
        const table: GameToken[][] = this.props.table.slice();
        const rows: React.ReactNode[] = [];

        table.forEach((tableRow, index) => {
            rows.push(<Row key={index}
                           cells={tableRow}
                           id={index}
                           onClickCellHandler={this.onClickCellHandler.bind(this)}/>);
        });

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