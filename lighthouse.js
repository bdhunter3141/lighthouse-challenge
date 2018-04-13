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
  ["", "^", "", "", "~", "~", "", "", "", ""],
];

function gridSize() {
  const y = GRID.length;
  const x = GRID[0].length;
  return `${x} x ${y}`
}

function totalCells() {
  const y = GRID.length;
  const x = GRID[0].length;
  return x * y;
}

function lightCell(cell) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const posX = alphabet.indexOf(cell[0]);
  const posY = cell[1] - 1;
  return GRID[posY][posX]
}

function isRock(cell) {
  return lightCell(cell) === "^";
}

function isCurrent(cell) {
  return lightCell(cell) === "~";
}

function lightRow(row) {
	const rowToLight = GRID[row];
	let litRow = [];
	for (cell of rowToLight) {
		litRow.push(cell);
	}
	return litRow;
}

console.log(lightRow(1));
