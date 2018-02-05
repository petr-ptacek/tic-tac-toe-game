import * as React from 'react';

export interface IPropsButtonData {
    buttonText: string;
    isDisabled: boolean;
    id: string;
    classes: string[] | string;
    onButtonClickHandler: (id: string) => void;
}

export interface IStateButtonData {

}

export class Button extends React.Component<IPropsButtonData, IStateButtonData> {

    constructor(props: IPropsButtonData) {
        super(props);
    }


    private onclickHandler(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onButtonClickHandler(this.props.id);
    }

    render(): React.ReactNode {
        let classes: string = "";

        if (Array.isArray(this.props.classes)) {
            classes = this.props.classes.join(" ");
        } else {
            classes = this.props.classes;
        }

        classes += this.props.isDisabled ? " btn-disabled" : "";

        return (
            <input type="button"
                   onClick={(e) => this.onclickHandler(e)}
                   value={this.props.buttonText}
                   className={classes}
                   disabled={this.props.isDisabled}/>
        );
    }
}