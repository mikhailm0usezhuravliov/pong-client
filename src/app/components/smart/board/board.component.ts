import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { Player } from '../../../../../../common/game';
import { filter, fromEvent, iif } from 'rxjs';
import { KeyCode } from 'src/app/shared/keycodes';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  private _ballx = 285;
  private _bally = 585;
  private _paddleLx = 250;
  private _paddleRx = 250;

  public status: string;

  public get getBallTop() {
    return `${this._ballx}px`;
  }
  public get getBallRight() {
    return `${this._bally}px`;
  }
  public get getPaddleL() {
    return `${this._paddleLx}px`;
  }
  public get getPaddleR() {
    return `${this._paddleRx}px`;
  }

  constructor(
    private socketService: SocketService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.socketService.listenToServer('game').subscribe((game) => {
      this._ballx = game.ballX;
      this._bally = game.ballY;
    });
    this.socketService.listenToServer('status').subscribe((game) => {
      this.status = game.status;
    });
    this.socketService.listenToServer('move').subscribe((game) => {
      this._paddleLx = game.paddleLx;
      this._paddleRx = game.paddleRx;
    });

    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter(
          (e) => e.code === KeyCode.ArrowDown || e.code === KeyCode.ArrowUp
        )
      )
      .subscribe((keyEvent) => {
        if (this.playerService.playerValue !== '') {
          this.socketService.emitToServer('move', {
            player: this.playerService.playerValue,
            direction: keyEvent.code,
          });
        }
      });
    // fromEvent<KeyboardEvent>(document, 'keydown')
    //   .pipe(filter((e) => e.code === KeyCode.KeyA || e.code === KeyCode.KeyZ))
    //   .subscribe((keyEvent) => {
    //     keyEvent.code == KeyCode.KeyZ
    //       ? this.socketService.emitToServer('move', {
    //           user: 'userL',
    //           direction: 'down',
    //         })
    //       : this.socketService.emitToServer('move', {
    //           user: 'userL',
    //           direction: 'up',
    //         });
    //   });
  }

  start() {
    this.socketService.emitToServer('start');
  }
  pause() {
    this.socketService.emitToServer('pause');
  }
  reset() {
    this.socketService.emitToServer('reset');
  }
}
