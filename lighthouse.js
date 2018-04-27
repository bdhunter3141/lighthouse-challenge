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

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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
      break;
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

function cellsAround(cell) {
  const posX = alphabet.indexOf(cell[0]);
  const posY = parseInt(cell.substring(1)) - 1;
  const allCells = [
    { type: "original", name: cell, contents: lightCell(cell) },
    {
      type: "above",
      name: `${alphabet[posX]}${parseInt(posY)}`,
      contents: GRID[posY - 1][posX]
    },
    {
      type: "below",
      name: `${alphabet[posX]}${parseInt(posY) + 2}`,
      contents: GRID[posY + 1][posX]
    },
    {
      type: "before",
      name: `${alphabet[posX - 1]}${parseInt(posY) + 1}`,
      contents: GRID[posY][posX - 1]
    },
    {
      type: "after",
      name: `${alphabet[posX + 1]}${parseInt(posY) + 1}`,
      contents: GRID[posY][posX + 1]
    },
    {
      type: "top left",
      name: `${alphabet[posX - 1]}${parseInt(posY)}`,
      contents: GRID[posY - 1][posX - 1]
    },
    {
      type: "top right",
      name: `${alphabet[posX + 1]}${parseInt(posY)}`,
      contents: GRID[posY - 1][posX + 1]
    },
    {
      type: "bottom left",
      name: `${alphabet[posX - 1]}${parseInt(posY) + 2}`,
      contents: GRID[posY + 1][posX - 1]
    },
    {
      type: "bottom right",
      name: `${alphabet[posX + 1]}${parseInt(posY) + 2}`,
      contents: GRID[posY + 1][posX + 1]
    }
  ];
  return allCells;
}

function isDangerous(cell) {
  let allCells = cellsAround(cell);
  let dangerous = false;
  for (cell of allCells) {
    if (containsRocks(cell.contents) || containsCurrents(cell.contents)) {
      dangerous = true;
      break;
    }
  }
  return dangerous;
}

function distressBeacon(cell) {
  const surroundingCells = cellsAround(cell);
  let safeCell = "No safe passage.";
  for (cell of surroundingCells) {
    if (!isDangerous(cell.name)) {
      safeCell = cell.name;
      break;
    }
  }
  return safeCell;
}

GRID[8][9] = "^";

function getTotalArea() {
  const y = GRID.length;
  const x = GRID[0].length;
  return x * y;
} 

function getReportNumbers() {
  const totalArea = getTotalArea();
  const currentNumber = allCurrents().length;
  const rockNumber = allRocks().length;
  const waterNumber = totalArea - (currentNumber + rockNumber);
  return [waterNumber, rockNumber, currentNumber];
}

function percentageReport() {
  return getReportNumbers();
  // const numberArray = getReportNumbers();
  // const totalArea = getTotalArea();
  // const rockPercentage = parseFloat((numberArray[1] / totalArea * 100).toFixed(2));
  // const currentPercentage = parseFloat((numberArray[2] / totalArea * 100).toFixed(2));
  // return [rockPercentage, currentPercentage];
}

function safetyReport() {
  const reportNumbers = getReportNumbers();
  const totalCells = reportNumbers.reduce((total, number) => {
    return total + number;
  })
  return `${((reportNumbers[0] / totalCells) * 100).toFixed(1)}%`;
}

function calcDistance(cell1, cell2) {
  const firstCell = {
    posX: alphabet.indexOf(cell1[0]),
    posY: (parseInt(cell1.substring(1)) - 1)
  }
  const secondCell = {
    posX: alphabet.indexOf(cell2[0]),
    posY: (parseInt(cell2.substring(1)) - 1)
  }
  return (Math.sqrt(Math.pow((firstCell.posX - secondCell.posX), 2) + Math.pow((firstCell.posY - secondCell.posY), 2))).toFixed(2);
}

console.log(calcDistance('A1', 'C3'));
// should return 2.83
