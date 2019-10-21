import React from 'react';
import { connect } from 'react-redux';

import './screen.scss';

export class Application extends React.Component {

  componentWillMount(){
    this.props.init();
  }

  render(){
    let {grid} = this.props.sudoku;
    return (
      <div className="sudoku">
        <header>
          <h1>Sudoku</h1>
          <div className="header-options">
            <div className="description">Fill the cells with values from 1 to 9. Only one unique value per vertical/horizontal line and per square block.</div>
            <button onClick={this.props.init}>New Game</button>
          </div>
        </header>
        <div className="application">
          {grid.map((row, index) => {
            return (<div className={(index+1) % 3 ===0 ? 'row row-block':'row'}>{row.map((cell, index)=>{
                return (<div className={(index+1) % 3 ===0 ? 'cell cell-block':'cell'}>{cell ? cell:'_'}</div>);
              })}</div>);
          })}
        </div>
      </div>
    );
  }

}

function mapStateToProps(state){
  return {
    sudoku:state.sudoku
  }
}

function mapDispatchToProps(dispatch){
  return {
    init: ()=> {
      dispatch({ type: 'SUDOKU_INIT'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
