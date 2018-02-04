import * as React from 'react';
import '../css/form.css';
import {GameToken} from "../game/GameToken";
import {InputNumber} from "./InputNumber";
import {ComboBoxInput} from "./ComboBoxInput";
import {CheckBoxInput} from "./CheckBoxInput";

export interface IPropsGameOptionsFormData {

}

export interface IStateGameOptionsFormData {
    player1: GameToken;
    player2: GameToken;
    rowWinLength: number;
    tableSize: number;
    playWithComputer?: boolean;
}

export class GameOptionsForm extends React.Component<IPropsGameOptionsFormData, IStateGameOptionsFormData> {
    constructor(props: IPropsGameOptionsFormData) {
        super(props);
    }


    render(): React.ReactNode {
        return (
            <form className={"form-style-1"}>
                <legend>Game Options</legend>
                <ul>
                    <li>
                        <InputNumber min={5} max={15} step={1} value={5} label={"Table size: "}/>
                    </li>
                    <li>
                        <InputNumber min={3} max={5} step={1} value={5} label={"Tokens to win in a row: "}/>
                    </li>
                    <li>
                        <ComboBoxInput options={["1", "2"]} label={"Select player1 Token: "}/>
                    </li>
                    <li>
                        <ComboBoxInput options={["1", "2"]} label={"Select player2 Token: "}/>
                    </li>
                    <li>
                        <CheckBoxInput label={"Play against Computer Player? "}/>
                    </li>
                </ul>
            </form>
        );
    }
}