import React from 'react';
import ReactDOM from 'react-dom';
import * as util from './util';
// import * as misc from './misc'
import './index.css'

class RandomNumber extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            randomNumber: 'load and generate'
        };
    }

    freshRandomNumber(){
        // showing the usage of code splitting
        require.ensure(['./misc'], () => {
            let misc = require('./misc');
            this.setState({
                randomNumber: misc.generateRandomNumber()
            });
        }, 'random-dependencies'); // name the chunk
    }

    render(){
        return <button onClick={this.freshRandomNumber.bind(this)}>
            {this.state.randomNumber}
        </button>;
    }
}

ReactDOM.render((
    <div>
        <p>Hi, here's your {util.toCapitalized('number')} <RandomNumber /></p>
        <p>Heads me back to <a href="./index.html">index</a>.</p>
    </div>
), document.getElementById('container'));
