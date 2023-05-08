import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { GameEvents } from 'src/app/shared/game';
import { moveBall } from './ball.actions';

@Injectable()
export class BallEffects {
  constructor(private socketService: SocketService) {}

  ballStream$ = createEffect(() =>
    this.socketService
      .listenToServer(GameEvents.game)
      .pipe(map((game) => moveBall(game['ball'])))
  );
}
