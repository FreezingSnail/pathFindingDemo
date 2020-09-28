import { Tile, tileType } from "./gridTile";

let WIDTH = 30;
let HEIGHT = 40;

export class Grid {
    map:Tile[][];

    constructor() {
        this.map = [];
        for(let i = 0; i < WIDTH; ++i){
            this.map[i] = new Array();
            for(let j = 0; j < HEIGHT; ++j){
                this.map[i].push(new Tile());
            }
        }
    }

    printMap(){
        // build each rows sting
        let rowString: string = "";
        for (let i = 0; i < WIDTH; ++i){
            for (let j = 0; j < HEIGHT; ++j){
                rowString += this.map[i][j].getTileChar();
            }
            console.log(rowString);
            rowString = "";
        }
    }


}