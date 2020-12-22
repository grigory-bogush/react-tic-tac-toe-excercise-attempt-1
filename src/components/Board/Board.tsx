import React from 'react';
import Square from '../Square';
import './board.scss';

interface IProps {
  squares: ISquare[];
  onSquareClick: (index: number) => void;
}

const Board: React.FC<IProps> = ({ squares, onSquareClick }) => {
  const drawSquare = (index: number) => {
    return (
      <Square key={index} value={squares[index]} onClick={() => onSquareClick(index)}/>
    )
  };

  return (
    <div className='board__container'>
      <div className='board__row'>
        {[0, 1, 2].map(index => drawSquare(index))}
      </div>
      <div className='board__row'>
        {[3, 4, 5].map(index => drawSquare(index))}
      </div>
      <div className='board__row'>
        {[6, 7, 8].map(index => drawSquare(index))}
      </div>
    </div>  
  );
}

export default Board;