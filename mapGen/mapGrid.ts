import { Tile } from "./gridTile";

export class grid {
    map:Tile[][];

    constructor() {
        this.map = new Array(120).map(() => new Array(150));
    }

    
}