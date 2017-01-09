import React from 'react';

export default class Component extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <p>A react component navigates you to a <a href="./random.html">random number</a>.</p>
            </div>
        );
    }
}