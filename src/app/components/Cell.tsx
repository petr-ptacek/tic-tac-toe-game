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

    private static gameToken2String(gameToken: GameToken): string {
        let token;

        switch (gameToken) {
            case GameToken.X:
                token = "X";
                break;
            case GameToken.O:
                token = "O";
                break;
        }

        return token;
    }

    render(): React.ReactNode {
        let classStyles: string;

        classStyles = "tic-tac-toe-cell";
        classStyles += this.props.playGame ? " empty-cell" : "";

        return (
            <div className={classStyles}
                 onClick={() => {
                     if (this.props.playGame) {
                         this.props.onClickCellHandler(this.props.id);
                     }
                 }}>
                {Cell.gameToken2String(this.props.token)}
            </div>
        );
    }
}