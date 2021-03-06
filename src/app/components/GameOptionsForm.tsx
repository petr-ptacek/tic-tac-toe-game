import * as React from 'react';
import '../css/form.css';
import {ComboBoxInput} from "./ComboBoxInput";
import {CheckBoxInput} from "./CheckBoxInput";
import {Button} from "./Button";
import {GameOptionsProperties} from "./GameContainer";

export interface IPropsGameOptionsFormData extends GameOptionsProperties {
    onButtonClickHandler: (id: string) => void;
    onChangeInputHandler: (id: string, value: string) => void;
}

export interface IStateGameOptionsFormData extends GameOptionsProperties {

}

/**
 * the player tokens to the particular input
 **/
const playerTokens: string[] = ["O", "X"];

/**
 * options for select the tableSize
 **/
const tableSizes: string[] = [];
for (let i = 5; i <= 18; i++)
    tableSizes.push(i.toString(10));


/**
 * Form to interact with the user. Passing the input parameter to the game option.
 */
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
                        {/*INPUT TABLE SIZE*/}
                        <ComboBoxInput id={"#table-size"}
                                       value={this.props.tableSize.toString()}
                                       isDisabled={this.props.isInputsDisabled}
                                       options={tableSizes}
                                       onChangeHandler={this.props.onChangeInputHandler}
                                       label={"Table size: "}/>
                    </li>
                    <li>
                        {/*INPUT TOKENS IN ROW*/}
                        <ComboBoxInput id={"#tokens-in-row"}
                                       value={this.props.rowWinLength.toString()}
                                       isDisabled={this.props.isInputsDisabled}
                                       options={["3", "4", "5"]}
                                       onChangeHandler={this.props.onChangeInputHandler}
                                       label={"Tokens to win in a row: "}/>
                    </li>
                    <li>
                        {/*INPUT PLAYER-1*/}
                        <ComboBoxInput id={"#player-1"}
                                       value={this.props.player1}
                                       options={playerTokens}
                                       isDisabled={this.props.isInputsDisabled}
                                       onChangeHandler={this.props.onChangeInputHandler}
                                       label={"Select player1 Token: "}/>
                    </li>
                    <li>
                        {/*INPUT PLAYER-2*/}
                        <ComboBoxInput id={"#player-2"}
                                       value={this.props.player2}
                                       isDisabled={this.props.isInputsDisabled}
                                       options={playerTokens}
                                       onChangeHandler={this.props.onChangeInputHandler}
                                       label={"Select player2 Token: "}/>
                    </li>
                    <li>
                        {/*INPUT PLAY WITH COMPUTER*/}
                        <CheckBoxInput isDisabled={this.props.isInputsDisabled}
                                       label={"Play against Computer Player? "}/>
                    </li>
                    <li>
                        {/*INPUT BUTTON OK*/}
                        <Button buttonText={this.props.btnOKText}
                                onButtonClickHandler={this.props.onButtonClickHandler}
                                isDisabled={this.props.isButtonOKDisabled}
                                id={"#btn-ok"}
                                classes={"btn btn-ok"}/>
                    </li>
                    <li>
                        {/*INPUT BUTTON CANCEL*/}
                        <Button buttonText={this.props.btnCancelText}
                                onButtonClickHandler={this.props.onButtonClickHandler}
                                isDisabled={this.props.isButtonCancelDisabled}
                                id={"#btn-cancel"}
                                classes={"btn btn-cancel"}/>
                    </li>
                </ul>
            </form>
        );
    }
}