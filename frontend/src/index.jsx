import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Grid, HEIGHT, WIDTH } from "./mapGen/mapGrid.ts"
import { Tile, tileType } from "./mapGen/gridTile"

function Square(type) {
    switch(type){
        case tileType.blocked: return <button className="square" style={{background: "black"}}/>;
        case tileType.regular: return <button className="square" style={{background: "blue"}}/>;
        case tileType.hard: return <button className="square" style={{background: "green"}}/>;
        case tileType.regularHighway: return <button className="square" style={{background: "white"}}/>;
        case tileType.hardHighway: return <button className="square" style={{background: "grey"}}/>;
        case tileType.path: return <button className="square" style={{background: "pink"}}/>;
        default: return <button className="square" style={{background: "brown"}}/>;
    }
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
  
    
  
    render(){
        let rows = this.state.map.map.map(function (item, i){
            let entry = item.map(function (element, j) {
                return ( 
                    <td key={j}> {Square(element.getType())} </td>
                    );
            });
            return (
                <tr key={i}> {entry} </tr>
            );
        });
        return (
            <table className="table-hover table-striped table-bordered">
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  
  