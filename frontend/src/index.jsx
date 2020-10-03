import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Grid, HEIGHT, WIDTH } from "./mapGen/mapGrid.ts"
import { Tile, tileType } from "./mapGen/gridTile"
import { aStar } from "./pathFinding/aStar"

function Square(type) {
    switch(type){
        case tileType.blocked: return <button className="square" style={{background: "black"}}/>;
        case tileType.regular: return <button className="square" style={{background: "blue"}}/>;
        case tileType.hard: return <button className="square" style={{background: "green"}}/>;
        case tileType.regularHighway: return <button className="square" style={{background: "white"}}/>;
        case tileType.hardHighway: return <button className="square" style={{background: "grey"}}/>;
        case tileType.path: return <button className="square" style={{background: "pink"}}/>;
        case tileType.start: return <button className="square" style={{background: "red"}}> S</button>;
        case tileType.end: return <button className="square" style={{background: "red"}}>E</button>;
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
      this.findPath = this.findPath.bind(this);
      this.log = this.log.bind(this);
      this.render = this.render.bind(this);
    }

    findPath() {
        let path= aStar(this.state.map);
        console.log(path);
        //console.log(map.start);
        //console.log(map.end);
        if(path.length >0){
            this.state.map.updateForPath(path);
            console.log("success");
            this.state.map.setPoints();
            this.render();
        }   
    }

    log(){
        this.state.map.printMap();
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
            <div>
            <button onClick={this.findPath}> Find path</button>
            <button onClick={this.log}> log</button>
            <table className="table-hover table-striped table-bordered">
                <tbody>
                    {rows}
                </tbody>
            </table>
            </div>
        );
    }
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  
  