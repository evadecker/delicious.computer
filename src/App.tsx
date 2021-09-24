import { Scene } from './Scene';
import { ReactComponent as Wordmark } from './wordmark.svg';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="scene">
        <Scene />
      </div>
      <header className="header">
        <Wordmark />
      </header>
      <button className="button">About</button>
    </div>
  );
};

export default App;
