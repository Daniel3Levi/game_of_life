//https://yyy.codeyars.com/kata/52423db9add6f6fc39000354/train/javascript

function getGeneration(cells, generations) {
  const copyCells = (grid) => {
    //columns
    let newGrid = [...grid];
    //rows
    newGrid.forEach((row, i) => (newGrid[i] = [...row]));

    return newGrid;
  };

  const isEdge = (grid, y, x) => {
    try {
      let val = grid[y][x];
      if (val === undefined) {
        return 0;
      } else {
        return val;
      }
    } catch (err) {
      return 0;
    }
  };

  const checkNeighbors = (grid, y, x) => {
    let neighbors_sum = 0;

    neighbors_sum += isEdge(grid, y - 1, x - 1);
    neighbors_sum += isEdge(grid, y - 1, x);
    neighbors_sum += isEdge(grid, y - 1, x + 1);
    neighbors_sum += isEdge(grid, y, x - 1);
    neighbors_sum += isEdge(grid, y, x + 1);
    neighbors_sum += isEdge(grid, y + 1, x - 1);
    neighbors_sum += isEdge(grid, y + 1, x);
    neighbors_sum += isEdge(grid, y + 1, x + 1);

    return neighbors_sum;
  };

  // console.table(cells);

  const createNewGeneration = (curr_gen, next_gen) => {
    for (let y = 0; y < curr_gen.length; y++) {
      let row = curr_gen[y];
      for (let x = 0; x < row.length; x++) {
        let cell = row[x];
        let cell_neighbors = checkNeighbors(curr_gen, y, x);
        // console.log('y', y, 'x', x, 'cell', cell, 'neighb:', cell_neighbors);
        if (cell === 0) {
          if (cell_neighbors === 3) {
            next_gen[y][x] = 1;
          }
        } else {
          if (cell_neighbors < 2 || cell_neighbors > 3) {
            next_gen[y][x] = 0;
          }
        }
      }
    }
    return next_gen;
  };

  while (generations - 1 > 0) {
    let cells_copy = copyCells(cells);
    cells = createNewGeneration(cells, cells_copy);
    console.table(cells);
    generations--;
  }

  return cells;
}

let exmp_cell = [
  [1, 0, 0],
  [0, 1, 1],
  [1, 1, 0],
];

console.log(getGeneration(exmp_cell, 4));
