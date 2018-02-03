import * as React from "react";
import '../css/cell.css';
import {GameToken} from "../game/GameToken";

export interface IPropsCellData {
    token: GameToken;
    id: number,
    onClickCellHandler: (idCell: number) => void
}

export interface IStateCellData {
}

export class Cell extends React.Component<IPropsCellData, IStateCellData> {
    constructor(props: IPropsCellData) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className={"tic-tac-toe-cell"}
                 onClick={() => this.props.onClickCellHandler(this.props.id)}>
                {this.props.token}
            </div>
        );
    }
}