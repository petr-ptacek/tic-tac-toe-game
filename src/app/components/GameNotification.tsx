import * as React from 'react';

export interface IPropsCurrentPlayerLabel {
    cssClasses: string;
    content: string;
}

export interface IStateCurrentPlayerLabel {
}

export class GameNotification extends React.Component<IPropsCurrentPlayerLabel, IStateCurrentPlayerLabel> {
    constructor(props: IPropsCurrentPlayerLabel) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className={this.props.cssClasses}>{this.props.content}</div>
        );
    }
}
