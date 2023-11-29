import React, { FC, useCallback, useState, useMemo } from 'react';

import { GameLevels, LevelNames, GameSettings } from '@/modules/GameSettings';

import { Scoreboard } from '@/components/Scoreboard';
import { Grid } from '@/components/Grid';
import {Top} from '@/components/Top'
import { CellState, Coords, Field, fieldGenerator, generateFieldWithDefaultState } from '@/helper/Field';
import { Wrapper } from '@/components/Game/Wrapper';
import { GameArea } from '@/components/Game/GameArea';
import { openCell } from '@/helper/CellsManipulator';
import { GameOver } from '@/components/Game/GameOver';

import { useGame } from './useGame';

export const GameWithHooks: FC = () => {
    // const [level, setLevel] = useState<LevelNames>('beginner')
    // const [isGameOver, setIsGameOver] = useState(false)
    // const [isWin, setIsWin] = useState(false)
    // const [size, bombs] = GameSettings[level]
    // //hiden
    // const [playerField, setPlayerField] = useState<Field>(
    //     generateFieldWithDefaultState(size, CellState.hidden)
    // )


    // const [gameField,setGameField] = useState<Field>(
    //     fieldGenerator(size, bombs/ (size * size))
    // );

    // const onClick = (coords: Coords) => {
    //     try {
    //         const newPlayerfield =  openCell(coords,playerField,gameField);
    //         setPlayerField([...newPlayerfield]);
    //     } catch (e) {
    //         setIsGameOver(true)
    //         setPlayerField([...gameField])
    //     }
        
    // };
    // const onChangeLevel = ({target: {value: level}}: React.ChangeEvent<HTMLSelectElement>) => {
    //     const newSettings = GameSettings[level as LevelNames]
    //     resetHandler(newSettings)
    // };
    // const resetHandler = ([size, bombs]: [number, number]) => {
    //     // fixed game field
    //     const newGameField = fieldGenerator(size, bombs / (size * size));
    //     const newPlayerfield =  generateFieldWithDefaultState(size,CellState.hidden);

    //     // updates with the user's moves
    //     setPlayerField([...newPlayerfield]);
    //     setGameField([...newGameField]);
    //     setIsGameOver(false)
    //     setIsWin(false)
    // };

    // const onReset = () => resetHandler([size, bombs]);
    const {
        level,
        isGameOver,
        isWin,
        settings,
        playerField,
        onClick,
        onChangeLevel,
        onReset,
    } = useGame()

    const[, bombs] = settings;
    // const onChangeLevelHandler = useCallback(
    //     ({ target: { value: level } }: React.ChangeEvent<HTMLSelectElement>) => {
    //       setSearchParams({ level });
    //       onChangeLevel(level as LevelNames);
    //     },
    //     // Stryker disable next-line ArrayDeclaration
    //     []
    //   );
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
            bombs={String(bombs)}
            onReset={onReset}
            onChangeLevel={({ target: { value: level } 
            }: React.ChangeEvent<HTMLSelectElement>) => {
                onChangeLevel(level as LevelNames);
            }}
        ></Scoreboard>
        {isGameOver && <GameOver onClick={onReset} isWin = {isWin}></GameOver>}
        <Grid
            onClick = {onClick}
            onContextMenu= {() => null}>
                            {playerField}
            </Grid>

        </GameArea>
    </Wrapper>
  );
};