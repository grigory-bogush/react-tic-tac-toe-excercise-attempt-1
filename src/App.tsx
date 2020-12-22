import React, { useState } from 'react';
import Game from './components/Game';
import './App.scss';

const App = () => {
  const [mode, setMode] = useState<IGameMode>();
  return (
    <div className='app__container'>
      {mode ?
        <Game mode={mode}/>
        :
        <div className='app__modes'>
          <button onClick={() => setMode('single')}>player 1</button>
          <button onClick={() => setMode('multi')}>player 2</button>
        </div>}
    </div>
  );
}

export default App;
