export enum tileType { 
    blocked,
    regular,
    hard,
    regularHighway,
    hardHighway
}

export class Tile {
    type: tileType;
    xChord: number;
    yChord: number;

    constructor(x:number, y:number, type?:tileType ){
        this.type = type | tileType.regular;
        this.xChord = x;
        this.yChord = y;
    }

    setType(type:tileType) {
        this.type = type;
    }

    getType() : tileType {
        return this.type;
    }

    getChords(): number[] {
        let chords = [2];
        chords[0] = this.xChord;
        chords[1] = this.yChord;

        return chords;
    }

    setToHighway() {
        if(this.type === tileType.hard) {
            this.setType(tileType.hardHighway);
        } 
        else if (this.type === tileType.regular) {
            this.setType(tileType.regularHighway);
        }
    }

    getTileChar() { 
        switch(this.type){
            case tileType.blocked: return '0';
            case tileType.regular: return ' ';
            case tileType.hard: return ' ';
            case tileType.regularHighway: return 'a';
            case tileType.hardHighway: return 'b';
            defualt: return '!'
        }
    }

}