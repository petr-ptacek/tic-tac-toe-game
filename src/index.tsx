import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './app/css/main.css';

import {Board} from "./app/components/Board";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Board countCells={5} countRows={5}/>,
    rootElement
);