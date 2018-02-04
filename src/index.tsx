import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './app/css/main.css';
import {GameContainer} from "./app/components/GameContainer";

const rootElement = document.getElementById("root");
// {/*<Game tableSize={5} rowWinLength={5} startPlayer={GameToken.X}/>,*/}
ReactDOM.render(
    <GameContainer/>,
    rootElement
);