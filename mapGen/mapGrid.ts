import { Tile, tileType } from "./gridTile";

let WIDTH = 160;
let HEIGHT = 120;
let HIGHWAYSIZE = 20;
let HIGHWAYCOUNT = 4;

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
    }

    printMap(){
        // build each rows sting
        let rowString: string = "";
        for (let i = 0; i < HEIGHT; ++i){
            for (let j = 0; j < WIDTH; ++j){
                rowString += this.map[i][j].getTileChar();
            }
            console.log(rowString);
            rowString = "";
        }
    }

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
                    let chance = Math.floor(Math.random() * 2);
                    if(chance === 1){//make tile hard
                        this.map[i][j].setType(tileType.hard);
                    }
                }
            }
        }
    }

    walkHighwayGen (tile:Tile, dir:direction_t) : Tile{

        if(tile === undefined){
            console.log();
            console.log("ded");
            console.log();
            return;
        }
        let newTile:Tile = tile;
        let chords:number[] =tile.getChords();
        let xCur = chords[0];
        let yCur = chords[1];

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

        newTile = this.map[yCur][xCur];
        if(newTile === undefined){
            console.log();
            console.log("null tile ref");
            console.log("last tile chords: " + tile.getChords());
            console.log("new Chords: " + xCur + "," + yCur);
            console.log("dir: " + dir);
            console.log();
            return tile;
        }
        console.log("new tile: " + newTile.getChords());
        return newTile;
    }

    genHighWays() {
        console.log();
        console.log("generating Highways")
        console.log();
        for (let highwayCount:number = 0; highwayCount < HIGHWAYCOUNT; ++highwayCount) {
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

            console.log("xStart:" + xStart +  " yStart:" + yStart);
            let y:number = yStart;
            let x:number = xStart;
            let curTile:Tile = this.map[y][x];
            for(let count:number = 0; count < 5; ++count) {
                for(let highwayLength:number = 0; highwayLength < 20; ++highwayLength) {
                    curTile.setToHighway();
                    console.log("current tile: " + curTile.getChords());
                    //while(curTile.getType() === tileType.regularHighway || curTile.getType() === tileType.hardHighway){
                            //get new direction
                    

                        let nextTile:Tile = this.walkHighwayGen(curTile, directionMoving);
                        if(nextTile === undefined || nextTile === curTile){
                            console.log();
                            console.log("newTile bad ");
                            console.log();
                            break;
                        }
                        console.log("updating curTile");
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
        }
    }


}