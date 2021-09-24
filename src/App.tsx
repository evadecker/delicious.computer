import { useState } from "react";
import { Scene } from "./Scene";
import { ReactComponent as Wordmark } from "./wordmark.svg";
import "./App.css";

const App = () => {
  const About = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button className="about-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "×" : "?"}
        </button>
        {isOpen && (
          <div className="about">
            <p>
              <strong>Delicious Computer</strong> is a design and front-end web
              development studio based in Brooklyn, New York.
            </p>
            <p>We build technology for people, not users.</p>
            <p>To inquire about a project, email hello@avery.computer</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="app">
      <Scene />
      <main className="main">
        <header className="header">
          <Wordmark />
        </header>
        <About />
      </main>
    </div>
  );
};

export default App;
