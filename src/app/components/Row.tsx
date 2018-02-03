import '../css/row.css'

import * as React from "react";
import {GameToken} from "../game/GameToken";
import {Cell} from "./Cell";


export interface IPropsRowData {
    cells: GameToken[];
    id: number;
    onClickCellHandler: (idRow: number, idCell: number) => void;
}

export interface IStateRowData {
}

export class Row extends React.Component<IPropsRowData, IStateRowData> {
    constructor(props: IPropsRowData) {
        super(props);
    }

    /**
     * If click is registered in CellComponent, call this method as callback.
     * @param {number} idCell identificator of particular cell location.
     */
    private onClickCellHandler(idCell: number): void {
        this.props.onClickCellHandler(this.props.id, idCell);
    }

    /**
     * Create a particular number of cell.
     * @returns {Array<React.ReactNode>} cells
     */
    private createCells(): Array<React.ReactNode> {
        const cellsTemp: GameToken[] = this.props.cells.slice();
        const cells: Array<React.ReactNode> = [];

        cellsTemp.forEach((token, index) => {
            cells.push(<Cell key={index}
                             id={index}
                             token={token}
                             onClickCellHandler={this.onClickCellHandler.bind(this)}/>);
        });

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