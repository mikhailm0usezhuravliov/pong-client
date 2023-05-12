import { createAction, props } from '@ngrx/store';

import { Ball } from 'src/app/shared/interfaces';

export const moveBall = createAction(
  '[board component] Move Ball',
  props<Ball>()
);
export const stopBall = createAction(
  '[board component] Ball stops',
);
