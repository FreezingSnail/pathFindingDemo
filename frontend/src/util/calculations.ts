export function distance(a:number[], b:number[]): number {
    let x:number = a[0] - b[0];
    let y:number = a[1] - b[1];

    return Math.sqrt(x*x + y*y);

}