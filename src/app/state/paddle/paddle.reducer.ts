import { createReducer, on } from '@ngrx/store';
import { Move, Paddle } from 'src/app/shared/interfaces';
import { movePaddle, changeStatePaddle } from './paddle.actions';

export interface PaddleState {
  paddleL: Paddle;
  paddleR: Paddle;
  paddleSpeed: number;
  error: string;
  //status: 'pending' | 'loading' | 'error' | 'success';
}

export const InitialState: PaddleState = {
  paddleL: { x: 250, y: 0 },
  paddleR: { x: 250, y: 0 },
  paddleSpeed: 25,
  error: '',
};

export const paddleReducer = createReducer(
  InitialState,
  on(movePaddle, (state, { direction, player }) => {
    let x = player === 'playerL' ? state.paddleL.x : state.paddleR.x;
    if (direction === Move.ArrowUp) {
      if (player === 'playerL' && state.paddleL.x > 20) {
        x = state.paddleL.x - state.paddleSpeed;
      }
      if (player === 'playerR' && state.paddleR.x > 20) {
        x = state.paddleR.x - state.paddleSpeed;
      }
    } else {
      if (player === 'playerL' && state.paddleL.x < 480) {
        x = state.paddleL.x + state.paddleSpeed;
      }
      if (player === 'playerR' && state.paddleR.x < 480) {
        x = state.paddleR.x + state.paddleSpeed;
      }
    }
    return {
      ...state,
      [player === 'playerR' ? 'paddleR' : 'paddleL']: { x: x, y: 0 },
    };
  }),
  on(changeStatePaddle, (state, { player, paddle }) => {
    return {
      ...state,
      [player === 'playerR' ? 'paddleR' : 'paddleL']: paddle,
    };
  })
);
