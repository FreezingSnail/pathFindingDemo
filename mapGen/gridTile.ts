export enum tileType { 
    blocked,
    regular,
    hard,
    regularHighway,
    hardHighway
}

export class Tile {
    type: tileType;

    constructor(type:tileType){
        this.type - type;
    }

    getTileChar() { 
        switch(this.type){
            case tileType.blocked: return '0';
            case tileType.regular: return '1';
            case tileType.hard: return '2';
            case tileType.regularHighway: return 'a';
            case tileType.hardHighway: return 'b';
            defualt: return '!'
        }
    }

}