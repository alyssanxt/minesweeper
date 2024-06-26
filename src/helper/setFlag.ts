import { CellState, Coords, Field } from './Field';
// import { detectSolvedPuzzle } from './detectSolvedPullze';
// import { copyField } from './copyField';

/**
 * Set flag to the cell
 * @param {Coords} coords
 * @param {Field} playerField
 * @param {Field} gameField
 * @param {number} prevFlagCounter
 * @param {number} bombs
 * @returns {[Field, boolean, number]}
 */
export const setFlag = (
  coords: Coords,
  playerField: Field,
  gameField: Field,
//   prevFlagCounter: number,
//   bombs: number
): Field =>{
//  [Field, boolean, number] => {
  const [y, x] = coords;
  const cell  = playerField[y][x]
//   const newPlayerField = copyField(playerField);

//   const cell = newPlayerField[y][x];

  const { flag, weakFlag, hidden } = CellState;

  switch (cell) {
    case flag:
        playerField[y][x] = weakFlag;
      break;
    case weakFlag:
        playerField[y][x] = hidden;
      break;
    case hidden:
        playerField[y][x] = flag;
      
      break;
  }
  return playerField

//   const [isSolved, flagCounter] = detectSolvedPuzzle(newPlayerField, gameField);

//   return [newPlayerField, isSolved, flagCounter];
return [[]]
};