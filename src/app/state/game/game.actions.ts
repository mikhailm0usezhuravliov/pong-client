import { createAction, props } from '@ngrx/store';
import { GameState } from './game.reducer';

export const startGame = createAction('[board component] Start Game');
export const scoreGame = createAction('[board component] Start Game', props<GameState>());
export const loadConfigGame = createAction('[board component] Start Game', props<GameState>());
export const pauseGame = createAction('[board component] Pause Game');
export const resetGame = createAction('[board component] Reset Game');
