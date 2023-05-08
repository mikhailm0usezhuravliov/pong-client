import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { GameEvents, Player } from '../../../shared/game';
import { filter, fromEvent, iif, tap } from 'rxjs';
import { KeyCode } from 'src/app/shared/keycodes';
import { PlayerService } from 'src/app/services/player.service';
import { Move } from 'src/app/shared/interfaces';
import { Store } from '@ngrx/store';
import { movePaddle } from 'src/app/state/paddle/paddle.actions';
import { selectPaddlesState } from 'src/app/state/paddle/paddle.selector';
import { AppState } from 'src/app/state/app.state';
import { selectBallState } from 'src/app/state/ball/ball.selectors';
import { selectGameConfig } from 'src/app/state/game/game.selectors';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public paddleState$ = this.store.select(selectPaddlesState);
  public ball$ = this.store.select(selectBallState);
  public config$ = this.store.select(selectGameConfig);

  public status: string;
  public goalR: boolean = false;
  public goalL: boolean = false;

  public ballDiameter: number;
  public boardStyle: Record<string, string | undefined | null>;
  public ballPosition: Record<string, string | undefined | null>;

  public boardStyles$;

  constructor(
    private socketService: SocketService,
    private playerService: PlayerService,
    private store: Store<AppState>
  ) {
    this.boardStyles$ = this.config$.pipe(
      tap((data) => {
        this.boardStyle = {
          width: `${data.boardWidth}px`,
          height: `${data.boardHeight}px`,
        };
        this.ballDiameter = data.ballDiameter;
        this.ballPosition = {
          top: `${data.ball.x}px`,
          left: `${data.ball.y}px`,
        };
      })
    );
    this.ball$ = this.ball$.pipe(
      tap((data) => {
        this.ballPosition = {
          top: `${data.x}px`,
          left: `${data.y}px`,
        };
      })
    );
  }

  ngOnInit(): void {
    this.socketService.listenToServer(GameEvents.status).subscribe((game) => {
      this.status = game.status;
    });

    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter(
          (keyEvent) =>
            keyEvent.code === KeyCode.ArrowDown ||
            keyEvent.code === KeyCode.ArrowUp
        )
      )
      .subscribe((keyEvent) => {
        if (this.playerService.playerValue !== null) {
          this.store.dispatch(
            movePaddle({
              player: this.playerService.playerValue,
              direction: Move[keyEvent.code as keyof typeof Move],
            })
          );
        }
      });

    this.socketService.listenToServer(GameEvents.score).subscribe((game) => {
      this.goalL = game.goal === 'goalL';
      this.goalR = game.goal === 'goalR';

      setTimeout(() => {
        this.goalL = false;
        this.goalR = false;
      }, 500);
    });
  }

  start() {
    this.socketService.emitToServer(GameEvents.start);
  }
  pause() {
    this.socketService.emitToServer(GameEvents.pause);
  }
  reset() {
    this.socketService.emitToServer(GameEvents.reset);
  }
}
