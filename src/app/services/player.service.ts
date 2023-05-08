import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private _player = new BehaviorSubject<'playerL' | 'playerR' | null>(null);
  public player: Observable<'playerL' | 'playerR' | null>;
  public get playerValue () {
    return this._player.getValue()
  };

  constructor() {
    this.player = this._player.asObservable();
  }
  setPlayer(player: 'playerL' | 'playerR') {
    this._player.next(player);
  }
}

