import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { GameState } from './game.reducer';

export const selectGame = (state: AppState) => state.game;
export const selectGameState = createSelector(
  selectGame,
  (state: GameState) => state
);

export const selectConfig = (state: AppState) => state.game;
export const selectGameConfig = createSelector(
  selectConfig,
  (state: GameState) => state.config
);
