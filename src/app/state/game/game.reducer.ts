import { createReducer, on } from '@ngrx/store';

import { Player } from 'src/app/shared/game';
import {
  pauseGame,
  resetGame,
  scoreGame,
  loadConfig,
  setPlayerName,
  setCurrentPlayer,
} from './game.actions';

export interface GameConfig {
  boardHeight: number;
  boardWidth: number;
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
  player: 'playerR' | 'playerL' | '';
  playerL: Player;
  playerR: Player;
  goal: '' | 'goalR' | 'goalL';
  config: GameConfig;
}

export const InitialGameState: GameState = {
  status: 'not ready',
  player: '',
  playerL: { name: '', score: 0 },
  playerR: { name: '', score: 0 },
  goal: '',
  config: {
    boardHeight: 600,
    boardWidth: 1200,
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
  on(loadConfig, (state, config) => ({ ...state, config: config })),

  on(setPlayerName, (state, { player, name }) => {
    let temPlayer: Player = { ...state[player] };
    temPlayer.name = name;
    return {
      ...state,
      [player]: temPlayer,
    };
  }),

  on(setCurrentPlayer, (state, { player }) => {
    return {
      ...state,
      player: player,
    };
  }),

  on(scoreGame, (state, { goal, playerL, playerR }) => {
    return {
      ...state,
      goal: goal,
      playerL: playerL,
      playerR: playerR,
    };
  }),
  on(pauseGame, (state) => ({ ...state, status: 'pause' })),
  on(resetGame, (state) => ({ ...state, status: 'not ready' }))
);
