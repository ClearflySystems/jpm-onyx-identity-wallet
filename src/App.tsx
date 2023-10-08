import React, {useEffect} from 'react';
import RouteBuilder from './routes/RouteBuilder';
window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {

  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <div className="enki-wallet-app">
      <header className="enki-wallet-header">
        <h1>ENKI Wallet</h1>
      </header>
      <div className="enki-wallet-content">
        <React.Fragment>
          <RouteBuilder/>
        </React.Fragment>
      </div>
    </div>
  );
}

export default App;
