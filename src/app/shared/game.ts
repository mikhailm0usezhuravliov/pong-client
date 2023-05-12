import { Paddle, Ball } from './interfaces';

export interface Game {
  status: 'action' | 'pause' | 'not ready';
  ball: Ball;
  paddleL: Paddle;
  paddleR: Paddle;
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
  loadConfig = 'loadConfig',
  pause = 'pause',
  reset = 'reset',
  connected = 'connected',
  disconnect = 'disconnect',
}
