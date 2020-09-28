enum tileType { 
    blocked,
    regular,
    hard,
    regularHighway,
    hardHighway
}

enum highwayDir {
    none,
    south,
    east,
    west
}

export class Tile {
    type: tileType;
    highwayDirection: highwayDir;

    constructor(type:tileType, dir?:highwayDir){
        this.type - type;
        this.highwayDirection = dir || highwayDir.none;
    }

}