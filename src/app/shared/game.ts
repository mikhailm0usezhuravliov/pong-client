export interface Game {
  status: 'action' | 'pause' | 'not ready';
  ballX: number;
  ballY: number;
  paddleLx: number;
  paddleRx: number;
  playerR: Player;
  playerL: Player;
  goal: '' | 'goalR' | 'goalL';
}
export interface Player {
  name: string;
  score: number;
}

export enum GameEvents {
  game = 'game',
  status = 'status',
  score = 'score',
  move = 'move',
  start = 'start',
  setPlayer = 'setPlayer',
  pause = 'pause',
  reset = 'reset',
  connected = 'connected',
  disconnect = 'disconnect',
}
