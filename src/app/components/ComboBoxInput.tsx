import * as React from 'react';
import {ChangeEvent} from "react";

export interface IPropsComboBoxInputData {
    id: string;
    options: string[];
    value: string;
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
        const options = this.props.options.map((option, index) => {
            return <option key={index}
                           value={option}>{option}</option>;
        });

        return (
            <div>
                <label>{this.props.label}</label>
                <select value={this.props.value}
                        className={"field-select"}
                        disabled={this.props.isDisabled}
                        onChange={(event) => this.onChangeHandler(event)}>
                    {options}
                </select>
            </div>
        );
    }
}