import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './app/css/main.css';
import {GameContainer} from "./app/components/GameContainer";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <GameContainer/>,
    rootElement
);