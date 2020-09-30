import { Tile, tileType } from "../mapGen/gridTile"

class QueElement {
    element:Tile;
    priority:number;

    constructor(element:Tile, priority:number) {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue {
    que:QueElement[];

    constructor() {
        this.que = [];
    }

    enqueue(item:Tile, priority:number) {

        let queMember:QueElement = new QueElement(item, priority);
        let inQue:boolean = false;

        for(let i:number = 0; i < this.que.length; ++i){
            if(this.que[i].priority > queMember.priority){
                this.que.splice(i, 0, queMember);
                inQue = true;
                break;
            }
        }

        if(!inQue) {
            this.que.push(queMember);
        }

    }

    pop() : Tile{
        if(!this.isEmpty()){
            let tile:Tile = this.que[0].element;
        }
        else{
            return null;
        }
    }

    remove(item:Tile) : boolean{
        for(let i:number = 0; i < this.que.length; ++i){
            if(this.que[i].element === item){
                this.que.splice(i, i+1);
                return true;
            }
        }

        return false;
    }

    isEmpty() : boolean {

        return this.que.length > 0 ? true : false;
    }


}