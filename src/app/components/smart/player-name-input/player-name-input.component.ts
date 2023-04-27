import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SocketService } from 'src/app/services/socket.service';
import { GameEvents, Player } from '../../../shared/game';
import { PlayerService } from 'src/app/services/player.service';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-player-name-input',
  templateUrl: './player-name-input.component.html',
  styleUrls: ['./player-name-input.component.scss'],
})
export class PlayerNameInputComponent implements OnInit {
  public lSelected: false;
  public rSelected: false;
  public playerRName = new FormControl('');
  public playerLName = new FormControl('');
  public playerL: Player;
  public playerR: Player;

  _currentPlayer: 'playerR' | 'playerL' | '';
  constructor(
    private socketService: SocketService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    // this.playerRName.valueChanges.subscribe((value) => {
    //   if (value) {
    //     this.playerLName.disable({ emitEvent: false });
    //     this._currentPlayer = 'playerR';
    //   } else {
    //     this._currentPlayer = '';
    //     this.playerLName.enable({ emitEvent: false });
    //   }
    //   this.playerService.setPlayer('playerR');
    //   this.socketService.emitToServer(GameEvents.setPlayer, {
    //     player: 'playerR',
    //     name: value,
    //   });
    // });
    // this.playerLName.valueChanges.subscribe((value) => {
    //   if (value) {

    //   } else {
    //     this._currentPlayer = '';
    //     this.playerRName.enable({ emitEvent: false });
    //   }
    //   this.playerService.setPlayer('playerL');
    //   this.socketService.emitToServer(GameEvents.setPlayer, {
    //     player: 'playerL',
    //     name: value,
    //   });
    // });
    merge(
      this.playerRName.valueChanges.pipe(
        tap(() => {
          this.playerLName.disable({ emitEvent: false });
          this._currentPlayer = 'playerR';
        })
      ),
      this.playerLName.valueChanges.pipe(
        tap(() => {
          this.playerRName.disable({ emitEvent: false });
          this._currentPlayer = 'playerL';
        })
      )
    ).subscribe((name) => {
      this.playerService.setPlayer(this._currentPlayer)
      this.socketService.emitToServer(GameEvents.setPlayer, {
        player: this._currentPlayer,
        name: name,
      });
    });

    // if name come from server fill value and disable control
    this.socketService
      .listenToServer(GameEvents.setPlayer)
      .subscribe((game) => {
        if (game.playerL && this._currentPlayer !== 'playerL') {
          this.playerLName.setValue(game.playerL.name, { emitEvent: false });
          this.playerLName.disable({ emitEvent: false });
        }
        if (game.playerR && this._currentPlayer !== 'playerR') {
          this.playerRName.setValue(game.playerR.name, { emitEvent: false });
          this.playerRName.disable({ emitEvent: false });
        }
      });

    this.socketService.listenToServer(GameEvents.score).subscribe((game) => {
      this.playerL = game.playerL;
      this.playerR = game.playerR;
    });
  }
}
