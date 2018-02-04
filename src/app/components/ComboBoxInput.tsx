import * as React from 'react';

export interface IPropsComboBoxInputData {
    options: string[];
    label: string;
}

export interface IStateComboBoxInputData {

}


export class ComboBoxInput extends React.Component<IPropsComboBoxInputData, IStateComboBoxInputData> {
    constructor(props: IPropsComboBoxInputData) {
        super(props);
    }


    render(): React.ReactNode {
        return (
            <div>
                <label>{this.props.label}</label>
                <select className={"field-select"}>
                    {this.props.options.map((option, index) => {
                        return <option key={index} value={option}>{option}</option>
                    })}
                </select>
            </div>
        );
    }
}