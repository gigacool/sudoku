import React from 'react';
import ReactDOM from 'react-dom';

import './screen.scss';

export class Application extends React.Component {

  render(){
    return (
      <div className="sudoku">
        <header>
          <h1>Sudoku</h1>
          <div className="header-options">
            <div className="description">Fill the cells with values from 1 to 9. Only one unique value per vertical/horizontal line and per square block.</div>
            <button>New Game</button>
          </div>
        </header>
        <div className="application">

        </div>
      </div>
    );
  }

}

export default Application;
