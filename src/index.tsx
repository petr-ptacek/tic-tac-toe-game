import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './app/css/main.css';

import {Game} from "./app/components/Game";
import {GameToken} from "./app/game/GameToken";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Game countRows={10} countCells={8} startPlayer={GameToken.X}/>,
    rootElement
);