import { CellState, Coords, Field } from './Field';
import { checkItemInField, getNeigboursItems } from './CellsManipulator';

/**
 * Open cell in the player field using game field info
 * @param {Coords} coords
 * @param {Field} playerField
 * @param {Field} gameField
 * @returns {Field}
 */
export const openCell = (
  coords: Coords,
  playerField: Field,
  gameField: Field
): Field => {
  const { empty, hidden, bomb } = CellState;

  const [y, x] = coords;
  const gameCell = gameField[y][x];

  if (gameCell === bomb) {
    throw new Error('Game Over');
  }

  if (gameCell === empty) {
    playerField[y][x] = gameCell;

    // get surrounding cells for this cell 
    const items = getNeigboursItems(coords);

    // recursively go through each cell and check the neighbours
    for (const [y, x] of Object.values(items)) {
      if (checkItemInField([y, x], gameField)) {
        const playerCell = playerField[y][x];
        const gameCell = gameField[y][x];

        if (playerCell === hidden && gameCell !== bomb) {
            // recursion taking place
          playerField = openCell([y, x], playerField, gameField);
        }
      }
    }
  }

  playerField[y][x] = gameCell;

  return playerField;
};