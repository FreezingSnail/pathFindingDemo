import { Tile, tileType } from "../mapGen/gridTile"

export class QueElement {
    element:Tile;
    f:number;
    g:number;
    h:number;
    parent:QueElement | null;

    //for a* we need a linked list of the paths
    //we can use the QueElm to store that for us
    constructor(element:Tile, f:number, parent?:QueElement) {
        this.element = element;
        this.f = f;
        this.h = 0;
        this.g = 0;
        this.parent = parent ||  null;
    }
}

export class PriorityQueue {
    que:QueElement[];

    constructor() {
        this.que = [];
    }

    enqueue(item:Tile, priority:number) {

        let queMember:QueElement = new QueElement(item, priority);
        let inQue:boolean = false;

        for(let i:number = 0; i < this.que.length; ++i){
            if(this.que[i].f > queMember.f){
                this.que.splice(i, 0, queMember);
                inQue = true;
                break;
            }
        }

        if(!inQue) {
            this.que.push(queMember);
        }

    }

    addQueElm(queMember:QueElement){
        let inQue:boolean = false;

        for(let i:number = 0; i < this.que.length; ++i){
            if(this.que[i].f > queMember.f){
                this.que.splice(i, 0, queMember);
                inQue = true;
                break;
            }
        }

        if(!inQue) {
            this.que.push(queMember);
        }

    }

    pop() : QueElement | null{
        if(!this.isEmpty()){
            let elm = this.que[0];
            this.que = this.que.slice(1);
            return elm;
        }

        return null;
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

        return this.que.length > 0 ? false : true;
    }
    
    inFringe(tile:Tile) : boolean {
        for(let i:number = 0; i < this.que.length; ++i){
            if(this.que[i].element === tile){
                return true;
            }
        }

        return false;
    }

    getElm(tile:Tile) :QueElement | null{
        let elm:QueElement| null = null;
        for(let i:number = 0; i < this.que.length; ++i){
            if(this.que[i].element === tile){
                elm = this.que[i];
            }
        }
        return elm;
    }

}