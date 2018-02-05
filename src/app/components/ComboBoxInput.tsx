import * as React from 'react';
import {ChangeEvent} from "react";

export interface IPropsComboBoxInputData {
    id: string;
    options: string[];
    defaultValue: string;
    label: string;
    isDisabled: boolean;
    onChangeHandler: (id: string, value: string) => void
}

export interface IStateComboBoxInputData {

}


export class ComboBoxInput extends React.Component<IPropsComboBoxInputData, IStateComboBoxInputData> {
    constructor(props: IPropsComboBoxInputData) {
        super(props);
    }

    private onChangeHandler(event: ChangeEvent<HTMLSelectElement>) {
        this.props.onChangeHandler(this.props.id, event.target.value);
    }

    render(): React.ReactNode {
        return (
            <div>
                <label>{this.props.label}</label>
                <select value={this.props.defaultValue}
                        className={"field-select"}
                        disabled={this.props.isDisabled}
                        onChange={(event) => this.onChangeHandler(event)}>
                    {this.props.options.map((option, index) => {
                        let result;
                        result = <option key={index}
                                         value={option}>{option}</option>;
                        return result;
                    })}
                </select>
            </div>
        );
    }
}