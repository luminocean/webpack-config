import React from 'react';
import ReactDOM from 'react-dom';
import Component from './Component';
import './index.css';
import drawingURL from './resources/webpack-drawing.png';

let app = (
    <div>
        <Component />
        <p>and a picture following:</p>
        <img src={drawingURL} />
    </div>
);

ReactDOM.render(app, document.getElementById('container'));