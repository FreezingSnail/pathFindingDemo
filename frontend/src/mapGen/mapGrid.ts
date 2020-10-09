import { Tile, tileType } from "./gridTile";
import { distance } from "../util/calculations"

let WIDTH:number = 160;
let HEIGHT:number = 120;
let HIGHWAYSIZE:number = 20;
let HIGHWAYCOUNT:number = 5;

enum direction_t { 
    none,
    down,
    right,
    up,
    left,
    outbounds
}



export class Grid {
    map:Tile[][];
    start:number[];
    end:number[];

    //construcor genorates a random map with start and end points.
    constructor() {
        this.map = [];
        for(let i = 0; i < HEIGHT; ++i){
            this.map[i] = new Array();
            for(let j = 0; j < WIDTH; ++j){
                this.map[i].push(new Tile(j, i));
            }
        }
        this.genHardCells();
        this.genHighWays();
        this.genBlockCells();

        this.start = this.genPoint();
        this.end =this.genPoint();
        while(distance(this.start, this.end) < 100){
            this.start = this.genPoint();
            this.end =this.genPoint();
        }

        this.setPoints();
    }

    //debug function that prints map to console
    printMap(){
        // build each rows sting
        let rowString: string = "";
        for (let i = 0; i < HEIGHT; ++i){
            for (let j = 0; j < WIDTH; ++j){
                if(i == this.start[1] && j === this.start[0]){
                    rowString +='S';
                }
                else if(i == this.end[1] && j === this.end[0]){
                    rowString += 'E';
                }
                else {
                    rowString += this.map[i][j].getTileChar();
                }
            }
            console.log(rowString);
            rowString = "";
        }
        console.log();
    }

    // generates 8 32x32 locations 
    //each tile in location given a 50% chance to switch to a hard tile
    genHardCells() {
        for (let regionsCount:number = 0; regionsCount < 8; ++regionsCount) {
            let xChord:number = Math.floor((Math.random() * WIDTH));
            let yChord:number = Math.floor((Math.random() * HEIGHT));
            let xStart:number = (xChord-16 > 0 ? (xChord-16) : 0);
            let yStart:number = (yChord-16 > 0 ? (yChord-16) : 0);
            let xEnd:number = (xChord+16 < WIDTH ? (xChord+16) : WIDTH);
            let yEnd:number = (yChord+16 < HEIGHT ? (yChord+16) : HEIGHT);

            console.log("xStart:" + xStart + " xEnd:" + xEnd + " yStart:" + yStart + " yEnd:" + yEnd);

            for(let i = yStart; i < yEnd; ++i) {
                for(let j = xStart; j < xEnd; ++j){
                    let chance = Math.floor(Math.random() * 2); //50% chance
                    if(chance === 1){//make tile hard
                        this.map[i][j].setType(tileType.hard);
                    }
                }
            }
        }
    }

    //helper funciton for highway generation
    //walks next tile in map and confirms its a valid tile
    //else returns the current tile as a failure
    walkHighwayGen (tile:Tile, dir:direction_t) : Tile{

        
        let newTile:Tile = tile;
        let chords:number[] = tile.getChords();
        
        if(tile === undefined){
            console.log();
            console.log("ded");
            console.log();
            return newTile;
        }

        //console.log("got CHords");
        let xCur = chords[0];
        let yCur = chords[1];
        //console.log("read CHords");

        switch(dir){ 
            case direction_t.down: {
                if(yCur + 1 >= HEIGHT){
                    console.log("Over height");
                    return tile;
                }
                yCur++;
                break;
            }
            case direction_t.left: {
                if(xCur + 1 >= WIDTH){
                    console.log("Over width");
                    return tile;
                }
                xCur++;
                break;
            }
            case direction_t.up: {
                if(yCur - 1 < 0){
                    console.log("under height");
                    return tile;
                }
                yCur--;
                break;
            }
            case direction_t.right: {
                if(xCur - 1 < 0){
                    console.log("under width");
                    return tile;
                }
                xCur--;
                break;
            }
            default: 
                console.log("walking is wrong");
                return tile;
        }

        //console.log("setting new tile");
        //console.log("x: " + xCur + " y: " + yCur);
        if(this.map[yCur] === undefined){
            console.log("map undefiend");
            return tile;
        }
        newTile = this.map[yCur][xCur];
        //console.log("updated new tile");
        if(newTile === undefined){
            console.log();
            console.log("null tile ref");
            console.log("last tile chords: " + tile.getChords());
            console.log("new Chords: " + xCur + "," + yCur);
            console.log("dir: " + dir);
            console.log();
            return tile;
        }
        //console.log("new tile: " + newTile.getChords());
        return newTile;
    }

    //generates a highways on the map
    //each highway is a series of 5 20 tile walks
    //each walk has a 20% chance of turning left or right
    //returns flase if highway generation is invalid
    //intersects another highway or a blocked block
    genHighWay(): boolean {
        //console.log();
        //console.log("generating Highways")
        //console.log();
        
        //pick a boundary, starting top clockwise;
        let boundary:number = Math.floor(Math.random() * 4);
        let xStart:number = 0;
        let yStart:number = 0;
        let directionMoving = direction_t.none;

        if(boundary%2 === 0){ //top or bottom
            xStart = Math.floor(Math.random() * WIDTH);
            if(boundary === 0){
                yStart = 0;
                directionMoving = direction_t.down;
            }
            else {
                yStart = HEIGHT-1;
                directionMoving = direction_t.up;
            }
        }
        else {
            yStart = Math.floor(Math.random() * HEIGHT);
            if(boundary === 1){
                xStart = 0;
                directionMoving = direction_t.left;
            }
            else {
                xStart = WIDTH-1;
                directionMoving = direction_t.right;
            }
        }

        //console.log("xStart:" + xStart +  " yStart:" + yStart);
        let y:number = yStart;
        let x:number = xStart;
        let curTile:Tile = this.map[y][x];
        //console.log("got curr tile");
        for(let count:number = 0; count < 5; ++count) {
            for(let highwayLength:number = 0; highwayLength < 20; ++highwayLength) {
                curTile.setToHighway();
                //console.log("updated type");
                //console.log("current tile: " + curTile.getChords());
                
                    let nextTile:Tile = this.walkHighwayGen(curTile, directionMoving);
                    //console.log("walked tile");
                    if(nextTile === undefined || nextTile === curTile){
                        console.log();
                        console.log("newTile bad ");
                        console.log();
                        return false; 
                    }
                    if(nextTile.getType() === tileType.regularHighway || nextTile.getType() === tileType.hardHighway)
                        return false;
                    //console.log("updating curTile");
                    curTile = nextTile;
                //}
            }

            let direction:number = Math.floor(Math.random() * 10);

            if(direction < 6) {
                // continue onwards
            }
            else {
                //perpindicular
                let turn:number = Math.floor(Math.random() * 2);
                if(turn === 0) {
                    //left
                    directionMoving--;
                }
                else {
                    //right
                    directionMoving++;
                }

                //correct enum
                if(directionMoving === direction_t.none ){
                    directionMoving = direction_t.left;
                }
                if(directionMoving === direction_t.outbounds) {
                    direction = direction_t.down;
                }
            }
        }

        return true;
    }

    //creates a deep copy of a tile[][] array
    copyGrid(map:Tile[][]): Tile[][] {
        let mapCopy:Tile[][] = [];

        for (let i:number = 0; i < HEIGHT; ++i){
            mapCopy[i] = new Array();
            for (let j:number = 0; j < WIDTH; ++j){
                mapCopy[i].push(map[i][j].clone());
            }
        }

        return mapCopy;
    }

    //Attempts to generate 5 highways
    //returns false if fails
    genHighWays() : boolean {
        let tries:number = 0;
        let count:number = 0
        while(tries <  20  && count < HIGHWAYCOUNT){
           //console.log();
           // console.log("highway attempts failed:" + tries);
            //console.log("highway attempts passed:" + count);
            //console.log();
            let oldMap:Tile[][] = this.copyGrid(this.map);

            let success:boolean = this.genHighWay(); 
            if(success){
                //console.log();
                //console.log("highway sucsessfull");
                //console.log();
                count++;
                //this.printMap();
            }
            else{
                this.map = oldMap;
                //console.log();
                //console.log("highway failed");
                //console.log();
                tries++;
            }
        }


        return true;
    }

    //randomly selects 20% of tiles and turns them to blocked tiles
    genBlockCells(){
        let cellsToBlock:Tile[] = [];

        while (cellsToBlock.length < Math.floor((HEIGHT*WIDTH) * .2)){
            let xChord = Math.floor(Math.random() * WIDTH);
            let yChord = Math.floor(Math.random() * HEIGHT);

            let tempTile = this.map[yChord][xChord];
            if(!(cellsToBlock.filter(tile => (tile.xChord === tempTile.xChord && tile.yChord === tempTile.yChord)).length > 0) &&
                    (tempTile.type !== tileType.hardHighway && tempTile.type !== tileType.regularHighway)){
                cellsToBlock.push(tempTile);
            }
        }

        cellsToBlock.forEach( tile => tile.setType(tileType.blocked));

        
    }

    //randomly produces a posistion within 20 tiles of a border
    genPoint(): number[] {
        

        let x = Math.floor(Math.random() * WIDTH);
        let y = Math.floor(Math.random() * HEIGHT);

        while( !(x < 20 || x > WIDTH-21) &&
                !(y<20 || y > HEIGHT - 21)) {

            x = Math.floor(Math.random() * WIDTH);
            y = Math.floor(Math.random() * HEIGHT);
        }


        return [x, y];
    }

    //returns an array of all neighboring tiles of input
    getNeighbors(chords:number[] ): Tile[] {
        if (chords.length < 2)
            return [];

        let neighbors = []
        let xStart = (chords[0] -1) < 0 ? 0 : (chords[0] -1);
        let yStart = (chords[1] -1) < 0 ? 0 : (chords[1] -1);

        let yEnd = (yStart + 3) <= HEIGHT ? (yStart + 3) : HEIGHT -1;
        let xEnd = (xStart + 3) <= WIDTH ? (xStart + 3) : WIDTH -1;
        console.log(xStart, yStart, xEnd, yEnd);
        for(let i = yStart; i < yEnd; ++i){
            for(let j = xStart; j < xEnd; ++j){

                //console.log("pull current chords");
                //console.log("tile chords: " + chords[0]+ ' ' + chords[1] , j, i);
                //console.log("not  tile? :" + !(j === chords[0] && i === chords[1]))
                if(!(j === chords[0] && i === chords[1])) { //not the same tile
                    //console.log("add neighbors")
                    //console.log(j, i);
                    let tile:Tile = this.map[i][j];
                    if(tile.getType() !== tileType.blocked)
                        neighbors.push(this.map[i][j]);
                }
            }
        }
        //console.log("neigbors are: ");
        //console.log(neighbors);
        return neighbors;
    }

    //returns tile at start chords
    getStart():Tile {
        return this.map[this.start[1]][this.start[0]];
    }

    //returns tile at end chords
    getEnd():Tile {
        return this.map[this.end[1]][this.end[0]];
    }

    //takes a tile array and updates tiles in map array to path type
    updateForPath(path:Tile[]) {
        for(let i:number = 0; i < path.length; i++){
            let chords:number[] = path[i].getChords();
            this.map[chords[1]][chords[0]].setType(tileType.path);
        }
    }

    //sets starting point and endpoint tiles on map.
    setPoints() {
        this.map[this.start[1]][this.start[0]].setType(tileType.start);
        this.map[this.end[1]][this.end[0]].setType(tileType.end);
    }
    
}