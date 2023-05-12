import { createAction, props } from '@ngrx/store';
import { GameConfig, GameState } from './game.reducer';
import { Player } from 'src/app/shared/game';

export const loadConfig = createAction(
  '[board component] Load game config',
  props<GameConfig>()
);

export const scoreGame = createAction(
  '[player name input] Score updated',
  props<GameState>()
);
export const setPlayerName = createAction(
  '[player name input] Set player name',
  props<{ player: 'playerR' | 'playerL'; name: string }>()
);
export const setCurrentPlayer = createAction(
  '[player name input] Set current player',
  props<{player: 'playerR' | 'playerL' | ''}>()
);

export const changeStatus = createAction(
  '[player name input] Score updated',
  props<{
    status: 'action' | 'pause' | 'not ready',
    playerL: Player,
    playerR: Player,
  }>()
);

export const startGame = createAction('[board component] Start Game');
export const pauseGame = createAction('[board component] Pause Game');
export const resetGame = createAction('[board component] Reset Game');
