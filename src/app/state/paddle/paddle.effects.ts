import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SocketService } from 'src/app/services/socket.service';
import { movePaddle, changeStatePaddle } from './paddle.actions';
import { tap, map } from 'rxjs';
import { GameEvents } from 'src/app/shared/game';
import { Injectable } from '@angular/core';

@Injectable()
export class PaddleEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService
  ) {}

  paddleMoves$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(movePaddle),
        tap((data) => {
          this.socketService.emitToServer(GameEvents.move, data);
        })
      ),
    { dispatch: false }
  );
  paddlesMoves$ = createEffect(() =>
    this.socketService
      .listenToServer(GameEvents.move)
      .pipe(
        map((data) =>
        changeStatePaddle({ player: data.player, paddle: data[data.player === 'playerR' ? 'paddleR' : 'paddleL'] })
        )
      )
  );
}
