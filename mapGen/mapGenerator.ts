import { aStar } from "../pathFinding/aStar";
import { Tile } from "./gridTile";
import { Grid } from "./mapGrid";

let map:Grid = new Grid();

map.printMap();
console.log(map.start);
console.log(map.end);

let path:Tile[] = aStar(map);
console.log(path);
console.log(map.start);
console.log(map.end);
if(path.length >0){
    map.updateForPath(path);
    map.printMap();
    console.log("success");
}