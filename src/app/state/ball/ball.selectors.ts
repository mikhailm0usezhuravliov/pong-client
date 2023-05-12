import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { BallState } from './ball.reducers';

export const selectBall = (state: AppState) => state.ball;
export const selectBallState = createSelector(
  selectBall,
  (state: BallState) => state.ball
);
