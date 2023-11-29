import React, { FC, useCallback, useState } from 'react';

import { GameLevels, LevelNames, GameSettings } from '@/modules/GameSettings';

import { Scoreboard } from '@/components/Scoreboard';
import { Grid } from '@/components/Grid';
import {Top} from '@/components/Top'
import { CellState, Coords, Field, fieldGenerator, generateFieldWithDefaultState } from '@/helper/Field';
import { Wrapper } from '@/components/Game/Wrapper';
import { GameArea } from '@/components/Game/GameArea';
import { openCell } from '@/helper/CellsManipulator';

// import { useGame } from './useGame';

export const GameWithHooks: FC = () => {
    const [level, setLevel] = useState<LevelNames>('beginner')

    const [size, bombs] = GameSettings[level]
    const [playerField, setPlayerField] = useState<Field>(
        generateFieldWithDefaultState(size, CellState.hidden)
    )
    const gameField = fieldGenerator(size, bombs/ (size * size));

    const onClick = (coords: Coords) => {
        const newPlayerfield =  openCell(coords,playerField,gameField);
        setPlayerField([...newPlayerfield]);
    };
    const onChangeLevel = ({target: {value: level}}: React.ChangeEvent<HTMLSelectElement>) => {
        setLevel(level as LevelNames);
        const [size] = GameSettings[level as LevelNames]
        const newPlayerfield =  generateFieldWithDefaultState(size,CellState.hidden);
        setPlayerField([...newPlayerfield]);
    };
  return (
    <Wrapper>    
        <Top feature="Flag" firstAction="ctrl" secondAction='click'>
            Minesweeper
        </Top>
        <GameArea>
        <Scoreboard
            time = "00"
            levels={GameLevels as unknown as string[]}
            defaultLevel={level}
            bombs="10"
            onReset={() => null}
            // onChangeLevel={({target: {value }}) => 
            //     // console.log("this is value", value)}
            //     // onChangeLevel= { () => 
            //     // console.log("this is value!!")}
            //     setLevel(value as LevelNames)}

            onChangeLevel={onChangeLevel}
        ></Scoreboard>
        <Grid
            onClick = {onClick}
            onContextMenu= {() => null}>
                            {playerField}
            </Grid>

        </GameArea>
    </Wrapper>
  );
};