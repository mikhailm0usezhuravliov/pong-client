import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { PaddleState } from './paddle.reducer';

export const selectPaddles = (state: AppState) => state.paddles;
export const selectPaddlesState = createSelector(
  selectPaddles,
  (state: PaddleState) => {
    return {
      paddleL: state.paddleL,
      paddleR: state.paddleR,
    };
  }
);
