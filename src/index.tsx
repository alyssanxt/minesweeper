import React, { Children } from 'react';
import ReactDOM from 'react-dom';
// import {Legend} from './components/Legend';
import App from './App';
import {Top} from './components/Top'
import { FC } from 'react';
import {Scoreboard} from './components/Scoreboard';
import {Grid} from './components/Grid';
import { Field } from './helper/Field';
import { Wrapper } from './components/Game/Wrapper';
import { GameArea } from './components/Game/GameArea';

// ReactDOM.render(<App />, document.getElementById('root'));
export interface GameProps {
    children: Field
}

const StaticField: Field = [
    [1,1],
    [1,1]
]


const Game: FC<GameProps> = () => (
    <Wrapper>    
        <Top feature="Flag" firstAction="ctrl" secondAction='click'>
            Minesweeper
        </Top>
        <GameArea>
        <Scoreboard
            time = "000"
            levels={['beginner', 'intermediate', 'expert']}
            bombs="10"
            onReset={() => null}
            onChangeLevel={() => null}
        ></Scoreboard>
        <Grid
            onClick = {() => null}
            onContextMenu= {() => null}>
                {StaticField}
            </Grid>
        </GameArea>
    </Wrapper>
)
ReactDOM.render(<Game>{StaticField}</Game>,document.getElementById('root')
)