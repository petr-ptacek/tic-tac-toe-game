import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './app/css/main.css';

import {Game} from "./app/components/Game";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Game countRows={5} countCells={5}/>,
    rootElement
);