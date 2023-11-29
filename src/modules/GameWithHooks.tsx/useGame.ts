import { useState, useCallback } from 'react';

import {
  Field,
  CellState,
  generateFieldWithDefaultState,
  fieldGenerator,
  Coords,
} from '@/helper/Field'
import { openCell } from '@/helper/openCell';
import { setFlag } from '@/helper/setFlag';

import { LevelNames, GameSettings } from '@/modules/GameSettings';

// import { useStatus } from './useStatus';
// import { useSettings } from './useSettings';
// import { useTime } from './useTime';

interface ReturnType {
  level: LevelNames;
//   time: number;
  isGameOver: boolean;
//   isGameStarted: boolean;
  isWin: boolean;
  settings: [number, number];
  playerField: Field;
  gameField: Field;
//   flagCounter: number;
  onClick: (coords: Coords) => void;
  onContextMenu: (coords: Coords) => void;
  onChangeLevel: (level: LevelNames) => void;
  onReset: () => void;
}

export const useGame = (): ReturnType =>{
    const [level, setLevel] = useState<LevelNames>('beginner')
    const [isGameOver, setIsGameOver] = useState(false)
    const [isWin, setIsWin] = useState(false)
    const [size, bombs] = GameSettings[level]
    //hiden
    const [playerField, setPlayerField] = useState<Field>(
        generateFieldWithDefaultState(size, CellState.hidden)
    )


    const [gameField,setGameField] = useState<Field>(
        fieldGenerator(size, bombs/ (size * size))
    );

    const onClick = (coords: Coords) => {
        try {
            const newPlayerfield =  openCell(coords,playerField,gameField);
            setPlayerField([...newPlayerfield]);
        } catch (e) {
            setIsGameOver(true)
            setPlayerField([...gameField])
        }
        
    };
    const onContextMenu = (coords: Coords) => {
        const newPlayerfield =  setFlag(coords,playerField,gameField);
        setPlayerField([...newPlayerfield]);
    };

    const onChangeLevel = (level: LevelNames) => {
        setLevel(level as LevelNames)
        const newSettings = GameSettings[level as LevelNames]
        resetHandler(newSettings)
    };
    const resetHandler = ([size, bombs]: [number, number]) => {
        // fixed game field
        const newGameField = fieldGenerator(size, bombs / (size * size));
        const newPlayerfield =  generateFieldWithDefaultState(size,CellState.hidden);

        // updates with the user's moves
        setPlayerField([...newPlayerfield]);
        setGameField([...newGameField]);
        setIsGameOver(false)
        setIsWin(false)
    };

    const onReset = () => resetHandler([size, bombs]);

    return {
        level,
        isGameOver,
        isWin,
        settings: [size, bombs],
        playerField,
        gameField,
        onClick,
        onContextMenu,
        onChangeLevel,
        onReset,
    };
};