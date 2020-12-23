import React, { useCallback, useLayoutEffect, useState } from 'react';
import Board from '../Board';
import { calculateWinner, updateBoardAt, getComputerStep, winnerToString } from '../utils';
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

    // isDraw has to be here to not have any issues with the winner checking
    // ideally, would be done in a setState callback
    if (winner || isDraw || isMultiplayer) return;

    if (isOsTurn) proccessStep('O', getComputerStep(squares));
  }, [winner, isDraw, squares, isMultiplayer, isOsTurn, proccessStep]);

  return (
    <div className='game__container'>
      <div className='game__title'>
        {winner ?
          (<span className='game__turn-title'>
            {winner === 'draw' ?
              'It\'s a draw'
              : `Winner is ${winnerToString(winner)}`}
          </span>
          ) : (
          <div className='game__turn'>
            <span className='game__turn-title'>1 player</span>
            <div className='game__turn-info'>
              {isXsTurn && <img className='game__turn-icon' src='o.svg' />}
              {!isXsTurn && <img className='game__turn-icon game__turn-icon--right' src='o.svg' />}
            </div>
            <span className='game__turn-title'> 2 player</span>
          </div>)}
      </div>
      <div className='game__board'>
        <Board squares={squares} onSquareClick={onSquareClick}/>
      </div>
      
      <div className='game__info'>
        <div className='game__stats'>
          <span>Player 1 </span>
          <span className='game__stats-counter'>{winsX.toString().padStart(2, '0')}</span>
          <div className='app__divider'/>
          <span>Player 2</span>
          <span className='game__stats-counter'>{winsO.toString().padStart(2, '0')}</span>
        </div>
        <div>
          <button className='app__button' onClick={resetGame}>
            <img className='app__icon' src='restart.svg'/>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Game;