import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GameOfLife from './GameOfLife';

ReactDOM.render(<GameOfLife x={Math.floor(window.innerWidth / 10)} y={Math.floor(window.innerHeight / 10)} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
