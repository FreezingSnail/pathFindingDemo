import { Tile, tileType } from "./gridTile";

export class Grid {
    map:Tile[][];

    constructor() {
        this.map = new Array(120)
                                .fill(new Tile(tileType.regular))
                                .map(() => new Array(150)
                                .fill(new Tile(tileType.regular)));
    }

    printMap(){
        // build each rows sting
        let rowString: string = "";
        for (let row of this.map){
            for (let tile of row){
                rowString += tile.getTileChar();
            }
            console.log(rowString);
        }
    }


}