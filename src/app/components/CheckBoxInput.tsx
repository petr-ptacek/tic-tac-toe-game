import * as React from 'react';

export interface IPropsCheckBoxInputData {
    label: string;
    isDisabled: boolean;
}

export interface IStateCheckBoxInputData {

}


export class CheckBoxInput extends React.Component<IPropsCheckBoxInputData, IStateCheckBoxInputData> {
    constructor(props: IPropsCheckBoxInputData) {
        super(props);
    }


    render(): React.ReactNode {
        return (
            <div>
                <label>{this.props.label}</label>
                <input className={"check-box"} disabled={this.props.isDisabled} type="checkbox"/>
            </div>
        );
    }
}