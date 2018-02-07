import * as React from "react";
import '../css/cell.css';
import {GameToken} from "../game/GameToken";

export interface IPropsCellData {
    token: GameToken;
    id: number;
    playGame: boolean;
    onClickCellHandler: (idCell: number) => void;
}

export interface IStateCellData {
}

export class Cell extends React.Component<IPropsCellData, IStateCellData> {
    constructor(props: IPropsCellData) {
        super(props);
    }

    render(): React.ReactNode {
        let token: string;
        let classStyles: string;

        switch (this.props.token) {
            case GameToken.X:
                token = "X";
                break;
            case GameToken.O:
                token = "O";
                break;
        }

        classStyles = "tic-tac-toe-cell";
        classStyles += this.props.playGame ? " empty-cell" : "";

        return (
            <div className={classStyles}
                 onClick={() => {
                     if (this.props.playGame) {
                         this.props.onClickCellHandler(this.props.id);
                     }
                 }}>
                {token}
            </div>
        );
    }
}