import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Grid, HEIGHT, WIDTH } from "./mapGen/mapGrid.ts"
import { Tile, tileType } from "./mapGen/gridTile"
import { aStar } from "./pathFinding/aStar"

function Square(type) {
    switch(type){
        case tileType.blocked: return <td className="square" style={{background: "black"}}/>;
        case tileType.regular: return <td className="square" style={{background: "blue"}}/>;
        case tileType.hard: return <td className="square" style={{background: "green"}}/>;
        case tileType.regularHighway: return <td className="square" style={{background: "white"}}/>;
        case tileType.hardHighway: return <td className="square" style={{background: "grey"}}/>;
        case tileType.path: return <td className="square" style={{background: "pink"}}/>;
        case tileType.start: return <td className="square" style={{background: "red"}}/>;
        case tileType.end: return <td className="square" style={{background: "orange"}}/>;
        default: return <td className="square" style={{background: "brown"}}/>;
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
        maps: [],
        pathFound: false,
        current: 0,
      };
      for(let i = 0; i < 5; i++){
          this.state.maps[i] = {"map": new Grid(), "pathFound": false};
      }

      this.findPath = this.findPath.bind(this);
      this.log = this.log.bind(this);
      this.nextMap = this.nextMap.bind(this);
      this.previousMap = this.previousMap.bind(this);
    }

    findPath() {
        let current = this.state.current;
        if (!this.state.maps[current]["pathFound"]) {
            let curMap = this.state.maps[current]["map"];
            let path= aStar(curMap);
            console.log(path);
            //console.log(map.start);
            //console.log(map.end);
            if(path.length >0){
                curMap.updateForPath(path);
                console.log("success");
                curMap.setPoints();
                this.state.maps[current]["pathFound"] = true;
                this.setState({pathFound: true});
            }   
        }
    }

    log(){
        let current = this.state.current;
        let curMap = this.state.maps[current]["map"].map;
        curMap.printMap();
    }

    nextMap() {
        if(this.state.current >=4)
            this.setState({current: 0})
        else
            this.setState({current: (this.state.current+1)})

    }

    previousMap(){

    }
    
  
    render(){
        let current = this.state.current;
        let curMap = this.state.maps[current]["map"].map;
        let rows = curMap.map(function (item, i){
            let entry = item.map(function (element, j) {
                return ( 
                    Square(element.getType())
                    );
            });
            return (
                <tr> {entry} </tr>
            );
        });
        return (
            <div>
            <button onClick={this.findPath}> Find path</button>
            <button onClick={this.log}> log</button>
            <button onClick={this.previousMap}> {'<'} </button>
            <button onClick={this.nextMap}> {'>'} </button>
            {'   Map number: '} {this.state.current}
            <table>
                {rows}
            </table>
            </div>
        );
    }
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  
  