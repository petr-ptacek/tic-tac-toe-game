import * as React from 'react';

export interface IPropsCheckBoxInputData {
    label: string;
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
                <input className={"check-box"} type="checkbox"/>
            </div>
        );
    }
}