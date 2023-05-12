import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import {
  changeStatus,
  loadConfig,
  pauseGame,
  resetGame,
  scoreGame,
  setPlayerName,
  startGame,
} from './game.actions';
import { GameEvents } from 'src/app/shared/game';

@Injectable()
export class GameEffects {
  constructor(
    private actions$: Actions,
    private socketService: SocketService
  ) {}

  gameScore$ = createEffect(() =>
    this.socketService
      .listenToServer(GameEvents.score)
      .pipe(map((game) => scoreGame(game)))
  );

  gameConfig$ = createEffect(() =>
    this.socketService
      .listenToServer(GameEvents.loadConfig)
      .pipe(map((config) => loadConfig(config)))
  );
  gameStatus$ = createEffect(() =>
    this.socketService
      .listenToServer(GameEvents.status)
      .pipe(map((game) => changeStatus(game)))
  );
  gameState$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(startGame, pauseGame, resetGame),
        tap((data) => {
          switch (data.type) {
            case '[board component] Pause Game': {
              this.socketService.emitToServer(GameEvents.pause, data);
              break;
            }
            case '[board component] Start Game': {
              this.socketService.emitToServer(GameEvents.start, data);
              break;
            }
            case '[board component] Reset Game': {
              this.socketService.emitToServer(GameEvents.reset, data);
              break;
            }
          }
        })
      ),
    { dispatch: false }
  );

  playerName$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(setPlayerName),
        tap((data) => {
          this.socketService.emitToServer(GameEvents.setPlayer, data);
        })
      ),
    { dispatch: false }
  );
}
