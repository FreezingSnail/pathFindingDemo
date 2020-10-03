import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Grid, HEIGHT, WIDTH } from "./mapGen/mapGrid.ts"
//import { Tile } from "../../mapGen/gridTile"

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.getTileChar()}
      </button>
    );
  }
  
  class Board extends React.Component {
    renderSquare(i, j) {
      return (
        <Square
          value={this.props.grid.map[j][i]}
        />
      );
    }
  
    render() {
      return (
        <div></div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        map: new Grid(),
        
      };
    }
  
    
  
    render() {
  
      return (
        <div className="map">
          <div className="map-board">
            <Board
            />
          </div>
          <div className="game-info">
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  
  