import { createAction, props } from '@ngrx/store';
import { Paddle, PaddleMove } from 'src/app/shared/interfaces';

export const movePaddle = createAction(
  '[board component] Move paddle',
  props<PaddleMove>()
);
export const changeSatePaddle = createAction(
  '[board component] paddle',
  props<{ player: string, paddle: Paddle; }>()
);
