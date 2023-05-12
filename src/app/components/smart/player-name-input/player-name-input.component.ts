import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Player } from '../../../shared/game';
import { Observable, Subscription, debounceTime, map, merge, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectGameStatus } from 'src/app/state/game/game.selectors';
import {
  setCurrentPlayer,
  setPlayerName,
} from 'src/app/state/game/game.actions';

@Component({
  selector: 'app-player-name-input',
  templateUrl: './player-name-input.component.html',
  styleUrls: ['./player-name-input.component.scss'],
})
export class PlayerNameInputComponent implements OnInit, OnDestroy {
  public playerRName = new FormControl('');
  public playerLName = new FormControl('');

  private _subscribtions$: Subscription[] = [];

  public selectGameStatus$: Observable<{
    status: 'action' | 'pause' | 'not ready';
    player: '' | 'playerR' | 'playerL';
    playerL: Player;
    playerR: Player;
  }> = this.store.select(selectGameStatus);

  public currentPlayer$: Observable<{ player: '' | 'playerR' | 'playerL' }> =
    this.selectGameStatus$.pipe(
      map((game) => ({
        player: game.player,
      }))
    );

  public playersScore$ = this.selectGameStatus$.pipe(
    map((game) => ({
      playerL: game.playerL.score,
      playerR: game.playerR.score,
    }))
  );

  constructor(private store: Store<AppState>) {}

  ngOnDestroy(): void {
    this._subscribtions$.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  ngOnInit(): void {
    this._subscribtions$.push(
      merge(
        this.playerRName.valueChanges.pipe(
          debounceTime(500),
          tap((name) => {
            if (name !== '') {
              this.playerLName.disable({ emitEvent: false });
              this.store.dispatch(setCurrentPlayer({ player: 'playerR' }));
            } else {
              this.store.dispatch(setCurrentPlayer({ player: '' }));
              this.playerLName.enable({ emitEvent: false });
            }

            this.store.dispatch(
              setPlayerName({ player: 'playerR', name: name ? name : '' })
            );
          })
        ),
        this.playerLName.valueChanges.pipe(
          debounceTime(500),
          tap((name) => {
            if (name !== '') {
              this.store.dispatch(setCurrentPlayer({ player: 'playerL' }));
              this.playerRName.disable({ emitEvent: false });
            } else {
              this.store.dispatch(setCurrentPlayer({ player: '' }));
              this.playerRName.enable({ emitEvent: false });
            }
            this.store.dispatch(
              setPlayerName({ player: 'playerL', name: name ? name : '' })
            );
          })
        )
      )
        .pipe()
        .subscribe()
    );
  }
}
