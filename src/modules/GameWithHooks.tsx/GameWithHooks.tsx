import React, { FC} from "react";

import { GameLevels, LevelNames, GameSettings } from "@/modules/GameSettings";

import { Scoreboard } from "@/components/Scoreboard";
import { Grid } from "@/components/Grid";
import { Top } from "@/components/Top";
import { Wrapper } from "@/components/Game/Wrapper";
import { GameArea } from "@/components/Game/GameArea";
import { GameOver } from "@/components/Game/GameOver";

import { useGame } from "./useGame";

export const GameWithHooks: FC = () => {
  const {
    level,
    isGameOver,
    isWin,
    settings,
    playerField,
    gameField,
    onContextMenu,
    onClick,
    onChangeLevel,
    onReset,
  } = useGame();

  const [, bombs] = settings;
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
      <Top feature="Flag" firstAction="ctrl" secondAction="click">
        Minesweeper
      </Top>
      <GameArea>
        <Scoreboard
          time="00"
          levels={GameLevels as unknown as string[]}
          defaultLevel={level}
          bombs={String(bombs)}
          onReset={onReset}
          onChangeLevel={({
            target: { value: level },
          }: React.ChangeEvent<HTMLSelectElement>) => {
            onChangeLevel(level as LevelNames);
          }}
        ></Scoreboard>
        {isGameOver && <GameOver onClick={onReset} isWin={isWin}></GameOver>}
        <Grid onClick={onClick} onContextMenu={onContextMenu}>
          {playerField}
        </Grid>
      </GameArea>
    </Wrapper>
  );
};
