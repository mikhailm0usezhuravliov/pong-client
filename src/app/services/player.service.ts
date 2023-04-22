import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Player } from '../../../../common/game';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private _player = new BehaviorSubject('');
  public player: Observable<string>;
  public get playerValue () {
    return this._player.getValue()
  };

  constructor() {
    this.player = this._player.asObservable();
  }
  setPlayer(player: string) {
    this._player.next(player);
  }
}

