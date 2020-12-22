

export const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// An incredibly simplistic 'AI'
export const getComputerStep = (squares: ISquare[]) => {
  let index: number;
  do {
    index = randomInteger(0, 8);
  } while (squares[index] != null);

  return index;
}

// Should be moved to a utility file, lookup solution
export const calculateWinner = (squares: ISquare[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const updateBoardAt = (squares: ISquare[], index: number, value: ISquare) => {
  return [...squares.slice(0, index), value, ...squares.slice(index + 1)];
}