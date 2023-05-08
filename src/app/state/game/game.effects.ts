import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { map } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { scoreGame } from './game.actions';
import { GameEvents } from 'src/app/shared/game';

@Injectable()
export class GameEffects {
  constructor(private socketService: SocketService) {}

  gameScore$ = createEffect(() =>
    this.socketService
      .listenToServer(GameEvents.score)
      .pipe(map((game) => scoreGame(game)))
  );
}
