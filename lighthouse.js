const GRID = [
  ["", "", "", "^", "", "", "", "", "", ""],
  ["", "", "", "", "~", "", "", "", "", ""],
  ["", "", "", "", "^", "^", "", "", "", ""],
  ["", "", "", "", "^", "^", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "^", "~", "~", "", "", "", "^", "", ""],
  ["", "^", "", "~", "~", "", "", "", "", ""],
  ["", "^", "", "", "~", "~", "", "", "", ""]
];

function gridSize() {
  const y = GRID.length;
  const x = GRID[0].length;
  return `${x} x ${y}`;
}

function totalCells() {
  const y = GRID.length;
  const x = GRID[0].length;
  return x * y;
}

function lightCell(cell) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const posX = alphabet.indexOf(cell[0]);
  const posY = parseInt(cell.substring(1)) - 1;
  let cellExist = false;
  if (posX < GRID[0].length - 1 && posY < GRID.length - 1) {
    cellExist = true;
  }
  return cellExist ? GRID[posY][posX] : cellExist;
}

function isRock(cell) {
  return lightCell(cell) === "^";
}

function containsRocks(cellArray) {
  let rock = false;
  for (cell of cellArray) {
    if (cell === "^") {
      rock = true;
      break
    }
  }
  return rock;
}

function isCurrent(cell) {
  return lightCell(cell) === "~";
}

function containsCurrents(cellArray) {
  let current = false;
  for (cell of cellArray) {
    if (cell === "~") {
      current = true;
      break;
    }
  }
  return current;
}

function lightRow(row) {
  const rowToLight = GRID[row];
  let litRow = [];
  for (cell of rowToLight) {
    litRow.push(cell);
  }
  return litRow;
}

function lightColumn(column) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const columnToLight = alphabet.indexOf(column);
  let litColumn = [];
  for (row of GRID) {
    litColumn.push(row[columnToLight]);
  }
  return litColumn;
}

function isSafe(cell) {
  if (isRock(cell) || isCurrent(cell)) {
    return false;
  } else {
    return true;
  }
}

function findCell(type) {
  let cellArray = [];
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (row in GRID) {
    for (let i = 0; i < GRID[row].length; i++) {
      if (GRID[row][i] === type) {
        cellArray.push(`${alphabet[i]}${parseInt(row) + 1}`);
      }
    }
  }
  return cellArray;
}

function allRocks() {
  return findCell("^");
}

function allCurrents() {
  return findCell("~");
}

function firstRock() {
  const rockArray = allRocks();
  return rockArray[0];
}

function firstCurrent() {
  const currentArray = allCurrents();
  return currentArray[0];
}

function isDangerous(cell) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const posX = alphabet.indexOf(cell[0]);
  const posY = parseInt(cell.substring(1)) - 1;
  const allCells = { 
    originalCell: lightCell(cell), 
    cellAbove: GRID[posY - 1][posX],
    cellBelow: GRID[posY + 1][posX],
    cellBefore: GRID[posY][posX - 1],
    cellAfter: GRID[posY][posX + 1]
   }
   if (containsRocks([allCells.originalCell, allCells.cellAbove, allCells.cellBelow, allCells.cellBefore, allCells.cellAfter]) || containsCurrents([allCells.originalCell, allCells.cellAbove, allCells.cellBelow, allCells.cellBefore, allCells.cellAfter])) {
     return true;
   } else {
     return false;
   }
}

console.log(isDangerous("B9"), isDangerous("I6"), isDangerous("E4"));
