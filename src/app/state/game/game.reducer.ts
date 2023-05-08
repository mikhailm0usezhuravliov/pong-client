import { createReducer, on } from '@ngrx/store';

import { Player } from 'src/app/shared/game';
import { pauseGame, resetGame, scoreGame, startGame } from './game.actions';

export interface GameConfig {
  boardHeight: number;
  boardWidth: number;
  ball: {
    x: number;
    y: number;
  };
  paddleLx: number;
  paddleRx: number;
  paddleHeight: number;
  ballDiameter: number;
  velosityXmin: number;
  velosityXmax: number;
  velosityYmin: number;
  velosityYmax: number;
  paddleSpeed: number;
}

export interface GameState {
  status: 'action' | 'pause' | 'not ready';
  playerL: Player;
  playerR: Player;
  goal: '' | 'goalR' | 'goalL';
  config: GameConfig;
}

export const InitialGameState: GameState = {
  status: 'not ready',
  playerL: { name: '', score: 0 },
  playerR: { name: '', score: 0 },
  goal: '',
  config: {
    boardHeight: 600,
    boardWidth: 1200,
    ball: {
      x: 285,
      y: 585,
    },
    paddleLx: 250,
    paddleRx: 250,
    paddleHeight: 100,
    ballDiameter: 30,
    velosityXmin: 3,
    velosityXmax: 5,
    velosityYmin: 5,
    velosityYmax: 9,
    paddleSpeed: 25,
  },
};

export const gameReducer = createReducer(
  // Supply the initial state
  InitialGameState,
  on(startGame, (state) => ({ ...state })),
  on(scoreGame, (state, { playerL, playerR }) => ({
    ...state,
    playerL: playerL,
    playerR: playerR,
  })),
  on(pauseGame, (state) => ({ ...state, status: 'pause' })),
  on(resetGame, (state) => ({ ...state, status: 'not ready' }))
);
