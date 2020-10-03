import { PriorityQueue, QueElement } from "../dataStructs/priorityQueue"
import { moveCost } from "../util/weights"
import { Grid } from "../mapGen/mapGrid"
import { Tile } from "../mapGen/gridTile"
import { distance } from "../util/calculations"


export function aStar(grid:Grid) {
    let fringe:PriorityQueue = new PriorityQueue();
    let visited:Tile[] = [];
    let start:Tile = grid.getStart();
    let end:Tile = grid.getEnd();
    let path:Tile[] = [];

    const hVal = function(tile:Tile) :number {
        return distance(end.getChords(), tile.getChords())
    }

    fringe.enqueue(start, 0);
    path.push(start);
    //console.log("beginging search: " + fringe.que.length);
    while(!fringe.isEmpty()){
        let currentTile:QueElement | null = fringe.pop();
        if(currentTile === null)
            break;
        //console.log("Starting with fringe[0]");
       // console.log(currentTile);


        //end condition
        if(currentTile.element === end){
           // console.log("end condition hit");
            while(currentTile.parent !== null){
                path.push(currentTile.element);
                currentTile = currentTile.parent;
            }

            return path.reverse();
        }

        visited.push(currentTile.element);
        let neighbors:Tile[] = grid.getNeighbors(currentTile.element.getChords());
        //console.log("got neighbors");
        for(let i:number = 0; i < neighbors.length; i++){
            //console.log("checking neighbors");
            let neighbor:Tile = neighbors[i];
            if(visited.indexOf(neighbor) >= 0){
                continue; // already visited this node
            }

            let gScore:number = currentTile.g + moveCost(currentTile.element, neighbor);


            if(!fringe.inFringe(neighbor)){
               // console.log("Neighbor in fringe");
                //must be the new best node
                let newHVal = hVal(neighbor);
                let newQueElm = new QueElement(neighbor, 0)
                newQueElm.h = newHVal;
                newQueElm.parent = currentTile;
                newQueElm.g = gScore;
                newQueElm.f = gScore + newHVal;
                fringe.addQueElm(newQueElm);

            }
            else {
                let oldElm = fringe.getElm(neighbor);
                if (oldElm !== null && gScore < oldElm.g) {
                   // console.log("found faster path to node");
                // already found this node slower so we can update it

                    oldElm.parent = currentTile;
                    oldElm.g = gScore;
                    oldElm.f = gScore + oldElm.h;
                }
                // otherwise already have it better in the fringe;
            }


        }



    }
    console.log("failure to find path")
    console.log(path);
    return []; //failure

}