import { createReducer, on } from '@ngrx/store';
import { Ball } from 'src/app/shared/interfaces';
import { moveBall, stopBall } from './ball.actions';

export interface BallState {
  status: 'move' | 'stop';
  ball: Ball;
}

export const InitialBallState: BallState = {
  status: 'stop',
  ball: { x: 0, y: 0 },
};

export const ballReducer = createReducer(
  // Supply the initial state
  InitialBallState,
  on(moveBall, (state, ball) => {
    return {
      ...state,
      ball: ball,
      status: 'move',
    };
  }),
  on(stopBall, (state) => ({ ...state, status: 'stop' }))
);
