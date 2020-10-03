import { Tile, tileType } from "../mapGen/gridTile";

const enum moveCase {
    regReg,
    regHard,
    regRhigh,
    regHhigh,
    hardHard,
    hardRhigh,
    hardHhigh,
    rhRh,
    rhHh,
    hhHh,
    error,
}

function isDiag(from:Tile, to:Tile) : boolean {
    return !(from.xChord === to.xChord || from.yChord === to.yChord);
}

function canMoveTo(to:Tile) : boolean {
    return (to.getType() !== tileType.blocked);
}


function moveType(from:Tile, to:Tile) : moveCase {
    let fromType:tileType = from.getType();
    let toType:tileType = to.getType();

    if(fromType === tileType.regular){
        if(toType === tileType.regular){
            return moveCase.regReg
        }
        else if(toType === tileType.hard){
            return moveCase.regHard
        }
        else if(toType === tileType.regularHighway){
            return moveCase.regRhigh;
        } 
        else if(toType === tileType.hardHighway){
            return moveCase.regHhigh;
        }

    }
    else if(fromType === tileType.hard){
        if(toType === tileType.regular){
            return moveCase.regHard
        }
        else if(toType === tileType.hard){
            return moveCase.hardHard;
        }
        else if(toType === tileType.regularHighway){
            return moveCase.hardRhigh;
        } 
        else if(toType === tileType.hardHighway){
            return moveCase.hardHhigh;
        }

    }
    else if(fromType === tileType.regularHighway){
        if(toType === tileType.regular){
            return moveCase.regRhigh;
        }
        else if(toType === tileType.hard){
            return moveCase.hardRhigh;
        }
        else if(toType === tileType.regularHighway){
            return moveCase.rhRh;
        } 
        else if(toType === tileType.hardHighway){
            return moveCase.rhHh;
        }

    } 
    else if(fromType === tileType.hardHighway){
        if(toType === tileType.regular){
            return moveCase.regHhigh;
        }
        else if(toType === tileType.hard){
            return moveCase.hardHhigh;
        }
        else if(toType === tileType.regularHighway){
            return moveCase.rhHh;
        } 
        else if(toType === tileType.hardHighway){
            return moveCase.hhHh;
        }

    }

    return moveCase.error;
}


export function moveCost(from:Tile, to:Tile) : number {
    if(!canMoveTo(to)){
        console.log("cant move to blocked tile");
        return -1;
    }

    let cost = 0;
    let fromType:tileType = from.getType();
    let toType:tileType = to.getType();
    let move:moveCase = moveType(from, to);

        switch(move) {
            case moveCase.regReg: {
                if(isDiag(from, to)){
                    cost = Math.sqrt(2)
                }
                else{
                    cost = 1;
                }

                break;
            }
            case moveCase.regHard: {
                if(isDiag(from, to)){
                    cost = (Math.sqrt(2) + Math.sqrt(8))/2;
                }
                else{
                    cost = 1.5;
                }

                break;
            }
            case moveCase.regRhigh: {
                if(isDiag(from, to)){
                    cost = Math.sqrt(2)
                }
                else{
                    cost = 1;
                }

                break;
            }
            case moveCase.regHhigh: {
                if(isDiag(from, to)){
                    cost = (Math.sqrt(2) + Math.sqrt(8))/2;
                }
                else{
                    cost = 1.5;
                }

                break;
            }
            case moveCase.hardHard: {
                if(isDiag(from, to)){
                    cost = Math.sqrt(8)
                }
                else{
                    cost = 2;
                }

                break;
            }
            case moveCase.hardRhigh: {
                if(isDiag(from, to)){
                    cost = (Math.sqrt(2) + Math.sqrt(8))/2;
                }
                else{
                    cost = 1.5;
                }

                break;
            }
            case moveCase.hardHhigh: {
                if(isDiag(from, to)){
                    cost = Math.sqrt(8)
                }
                else{
                    cost = 2;
                }

                break;
            }
            case moveCase.rhRh: {
                if(isDiag(from, to)){
                    cost = Math.sqrt(2)/4
                }
                else{
                    cost = 1/4;
                }

                break;
            }
            case moveCase.rhHh: {
                if(isDiag(from, to)){
                    cost = (Math.sqrt(2) + Math.sqrt(8))/2/4;
                }
                else{
                    cost = 1.5/4;
                }

                break;
            }
            case moveCase.hhHh: {
                if(isDiag(from, to)){
                    cost = Math.sqrt(8)/4
                }
                else{
                    cost = 2/4;
                }

                break;
            }
            default :
            console.log("moveCases are wrong");
            return -1;
        }

        


    return cost;

}