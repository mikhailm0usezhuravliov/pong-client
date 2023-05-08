import { BallState } from './ball/ball.reducers';
import { GameState } from './game/game.reducer';
import { PaddleState } from './paddle/paddle.reducer';

export interface AppState {
  paddles: PaddleState;
  ball: BallState;
  game: GameState;
}
