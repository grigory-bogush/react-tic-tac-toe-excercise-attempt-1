import React from 'react';
import './square.scss';

interface IProps {
  value: ISquare;
  onClick?: ICallback;
}

export const Square: React.FC<IProps> = ({ value, onClick }) => {
  return (
    <div className='square__container' onClick={onClick}>
      {value}
    </div>
  );
}

export default Square;