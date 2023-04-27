export interface PaddleMove {
  player: 'playerL' | 'playerR';
  moveDirection: Move;
}

export enum Move {
  MoveUp = 'moveUp',
  MoveDown = 'moveDown',
}

