import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter, fromEvent, iif, map, tap } from 'rxjs';
import { KeyCode } from 'src/app/shared/keycodes';
import { Move } from 'src/app/shared/interfaces';
import { Store } from '@ngrx/store';
import { movePaddle } from 'src/app/state/paddle/paddle.actions';
import { selectPaddlesState } from 'src/app/state/paddle/paddle.selector';
import { AppState } from 'src/app/state/app.state';
import { selectBallState } from 'src/app/state/ball/ball.selectors';
import {
  selectGameConfig,
  selectGameStatus,
} from 'src/app/state/game/game.selectors';
import {
  pauseGame,
  resetGame,
  startGame,
} from 'src/app/state/game/game.actions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public paddleState$ = this.store.select(selectPaddlesState);
  public ball$ = this.store.select(selectBallState);
  public config$ = this.store.select(selectGameConfig);
  public boardStyles$;
  public boardStyle: Record<string, string | undefined | null>;
  public ballPosition: Record<string, string | undefined | null>;

  public goals: string[] = [];
  public player: '' | 'playerR' | 'playerL';
  private _goals$ = this.store.select(selectGameStatus).pipe(
    tap((game) => {
      this.player = game.player;
      this.goals.push(game.goal == 'goalR' ? 'goal-right' : '');
      this.goals.push(game.goal == 'goalL' ? 'goal-left' : '');
      setTimeout(() => {
        this.goals.pop();
      }, 300);
    })
  );
  private _subscribtions$: Subscription[] = [];

  constructor(private store: Store<AppState>) {
    this.boardStyles$ = this.config$.pipe(
      tap((data) => {
        this.boardStyle = {
          width: `${data.boardWidth}px`,
          height: `${data.boardHeight}px`,
        };
        this.boardStyle;
        this.ballPosition = {
          top: `${data.boardHeight / 2 - data.ballDiameter / 2}px`,
          left: `${data.boardWidth / 2 - data.ballDiameter / 2}px`,
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
  ngOnDestroy(): void {
    this._subscribtions$.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    this._subscribtions$.push(
      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(
          map((keyEvent) => keyEvent.code),
          filter(
            (code) => code === KeyCode.ArrowDown || code === KeyCode.ArrowUp
          )
        )
        .subscribe((code) => {
          if (this.player) {
            this.store.dispatch(
              movePaddle({
                player: this.player,
                direction: Move[code as keyof typeof Move],
              })
            );
          }
        })
    );
    this._subscribtions$.push(this._goals$.subscribe());
  }

  start() {
    this.store.dispatch(startGame());
  }
  pause() {
    this.store.dispatch(pauseGame());
  }
  reset() {
    this.store.dispatch(resetGame());
  }
}
