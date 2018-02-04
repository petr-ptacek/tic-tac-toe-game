import * as React from 'react';

export interface IPropsInputNumberData {
    min: number;
    max: number;
    value: number;
    label: string;
    step: number;
}

export interface IStateInputNumberData {

}

export class InputNumber extends React.Component<IPropsInputNumberData, IStateInputNumberData> {
    constructor(props: IPropsInputNumberData) {
        super(props);
    }


    render(): React.ReactNode {
        return (
            <div>
                <label>{this.props.label}</label>
                <input type="number"
                       className={"field-long"}
                       min={this.props.min}
                       max={this.props.max}
                       step={this.props.step}
                       value={this.props.value}
                />
            </div>
        );
    }
}