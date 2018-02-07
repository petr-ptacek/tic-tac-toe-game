import * as React from 'react';

export interface IPropsHeaderData {
    content: string;
}

export interface IStateHeaderData {

}


export class Header extends React.Component<IPropsHeaderData, IStateHeaderData> {
    constructor(props: IPropsHeaderData) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <h1 className={"main-header"}>
                {this.props.content}
            </h1>
        );
    }
}