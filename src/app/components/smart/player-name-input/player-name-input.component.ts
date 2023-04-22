import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SocketService } from 'src/app/services/socket.service';
import { Player } from '../../../../../../common/game';
import { PlayerService } from 'src/app/services/player.service';

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
    this.playerRName.valueChanges.subscribe((value) => {
      if (value) {
        this.playerLName.disable({ emitEvent: false });
        this._currentPlayer = 'playerR';
      } else {
        this._currentPlayer = '';
        this.playerLName.enable({ emitEvent: false });
      }
      this.playerService.setPlayer('playerR');
      this.socketService.emitToServer('playerR', value);
    });
    this.playerLName.valueChanges.subscribe((value) => {
      if (value) {
        this.playerRName.disable({ emitEvent: false });
        this._currentPlayer = 'playerL';
      } else {
        this._currentPlayer = '';
        this.playerRName.enable({ emitEvent: false });
      }
      this.playerService.setPlayer('playerL');
      this.socketService.emitToServer('playerL', value);
    });

    // if name come from server fill value and disable control
    this.socketService.listenToServer('playerL').subscribe((game) => {
      if (this._currentPlayer !== 'playerL') {
        this.playerLName.setValue(game.playerL.name, { emitEvent: false });
        this.playerLName.disable({ emitEvent: false });
      }
    });
    this.socketService.listenToServer('playerR').subscribe((game) => {
      if (this._currentPlayer !== 'playerR') {
        this.playerRName.setValue(game.playerR.name, { emitEvent: false });
        this.playerRName.disable({ emitEvent: false });
      } else {
        //this.playerService.setPlayer(game.playerL);
      }
    });

    this.socketService.listenToServer('score').subscribe((game) => {
      this.playerL = game.playerL;
      this.playerR = game.playerR;
    });
  }
}
