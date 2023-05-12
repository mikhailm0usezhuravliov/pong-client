export interface PaddleMove {
  player: 'playerL' | 'playerR';
  direction: Move;
}
export interface Paddle {
  x: number;
  y: number;
}
export interface Ball {
  x: number;
  y: number;
}



export enum Move {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
}
