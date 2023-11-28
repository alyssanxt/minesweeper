import React from 'react';
import ReactDOM from 'react-dom';
// import {Legend} from './components/Legend';
import App from './App';
import {Top} from './components/Top'

// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <Top feature="Flag" firstAction="ctrl" secondAction='click'>
        Minesweeper
    </Top>,
    document.getElementById('root')
)