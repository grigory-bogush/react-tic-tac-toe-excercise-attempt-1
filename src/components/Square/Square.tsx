import React from 'react';
import './square.scss';

interface IProps {
  value: ISquare;
  onClick?: ICallback;
}

export const Square: React.FC<IProps> = ({ value, onClick }) => {

  let square: React.ReactNode = null;
  switch(value) {
    case 'X':
      square = <img className='square__image' src='x.svg' />;
      break;
    case 'O':
      square = <img className='square__image' src='o.svg' />;
      break;
  }

  return (
    <div className='square__container' onClick={onClick}>
      {square}
    </div>
  );
}

export default Square;