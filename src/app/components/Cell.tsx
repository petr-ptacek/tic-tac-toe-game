import * as React from "react";
import '../css/cell.css';
import {GameToken} from "../game/GameToken";

export interface IPropsCellData {
    token?: GameToken;
}

export interface IStateCellData {
}

export class Cell extends React.Component<IPropsCellData, IStateCellData> {
    constructor(props: IPropsCellData) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className={"tic-tac-toe-cell"}>
                {this.props.token}
            </div>
        );
    }
}