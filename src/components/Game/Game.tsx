import React, { useCallback, useLayoutEffect, useState } from 'react';
import Board from '../Board';
import { calculateWinner, updateBoardAt, getComputerStep } from '../utils';
import './game.scss';

const initSquares = Array(9).fill(null);

interface IProps {
  mode?: IGameMode;
}

const Game: React.FC<IProps> = ({ mode='multi' }) => {
  const isMultiplayer = mode === 'multi';

  const [winsX, setWinsX] = useState(0);
  const [winsO, setWinsO] = useState(0);

  const [winner, setWinner] = useState<'X' | 'O' | 'draw'>();

  const [squares, setSquares] = useState<ISquare[]>(initSquares);
  const [stepCounter, setStepCounter] = useState(0);

  const isOsTurn = Boolean(stepCounter % 2);
  const isXsTurn = !isOsTurn;

  const isDraw = stepCounter >= initSquares.length;

  const proccessStep = useCallback((value: ISquare, index: number) => {
    const updatedSquares = updateBoardAt(squares, index, value);

    setSquares(updatedSquares);
    setStepCounter(s => s + 1);

    const newWinner = calculateWinner(updatedSquares);
    if (newWinner) {
      setWinner(newWinner);
    }
  }, [squares]);

  const onSquareClick = (index: number) => {
    if (winner || squares[index] != null) return;

    const value = isXsTurn ? 'X' : 'O';
    proccessStep(value, index);
  }

  const resetGame = () => {
    setSquares(initSquares);
    setWinner(undefined);
    setStepCounter(0);
  }

  useLayoutEffect(() => {
    if (winner === 'X') {
      setWinsX(s => s + 1);
    } else if (winner === 'O') {
      setWinsO(s => s + 1);
    }
  }, [winner]);
  
  // using layout effect to prevent any flickering
  useLayoutEffect(() => {
    if (!winner && isDraw) setWinner('draw');
  }, [winner, isDraw]);

  useLayoutEffect(() => {

    // isDraw has to be here to not have any issues with the winner check
    // ideally, would be done in a setState callback
    if (winner || isDraw || isMultiplayer) return;

    if (isOsTurn) proccessStep('O', getComputerStep(squares));
  }, [winner, isDraw, squares, isMultiplayer, isOsTurn, proccessStep]);

  return (
    <div className='game__container'>
      <div className='game__title'>
        {Boolean(winner) ?
          <span>{winner === 'draw' ? 'It\'s a draw' : `Winner is: ${winner}`}</span>
          :
          <span>
            {isXsTurn && <span>X's turn</span>}
            {!isXsTurn && <span>O's turn</span>}
          </span>}
      </div>
      <div className='game__board'>
        <Board squares={squares} onSquareClick={onSquareClick}/>
      </div>
      
      <div className='game__actions'>
        <button onClick={resetGame}>Restart</button>
      </div>
      <div className='game__stats'>
        <span>Wins X: {winsX}</span>
        <span> Wins O: {winsO}</span>
      </div>
    </div>
  );
}

export default Game;