import { useCallback, useState, useRef } from 'react';
import './App.css';
import produce from 'immer';

const numOfRows = 50;
const numOfCols = 50;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function generateColor() {
  let color = 'red';
  let colors = ['red', 'blue', 'green'];
  let randomNum = Math.floor(Math.random() * 3);
  color = colors[randomNum];

  return color;
}

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numOfRows; i++) {
      rows.push(Array.from(Array(numOfCols), () => 0));
      // for (let j = 0; j < numOfCols; j++) {}
    }

    return rows;
  });

  console.log(grid);

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numOfRows; i++) {
          for (let k = 0; k < numOfCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (
                newI >= 0 &&
                newI < numOfRows &&
                newK >= 0 &&
                newK < numOfCols
              ) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 1000);
  }, []);
  return (
    <>
      <div>
        <h1>Daniel's Game Of Life</h1>
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? 'Stop' : 'Start'}
        </button>
      </div>
      <link href="www.danielevi.co.il">
        <h3>www.Danielevi.co.il</h3>
      </link>
      <div
        className="App"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numOfCols},20px)`,
        }}
      >
        {grid.map((row, i) =>
          row.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? generateColor() : undefined,
                border: '1px solid black',
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
