import React from 'react';
import './style.scss';

export default class App extends React.Component {
    hi = 'Hi and ';
    render () {
        return (
            <div className="test">{this.hi}Hello World</div>
        );
    }
}
