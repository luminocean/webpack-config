import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

ReactDOM.render((
    <div>
        <span>Hi, here's your number {parseInt(Math.random() * 1000)}!</span>
        <p>Heads me back to <a href="./index.html">index</a>.</p>
    </div>
), document.getElementById('container'));
