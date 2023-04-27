import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { GameEvents, Player } from '../../../shared/game';
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

  public boxShadowStyle: '10px 0px red' | '-10px 0px red' | '' = '';

  public status: string;
  public goal: string;

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
    this.socketService.listenToServer(GameEvents.game).subscribe((game) => {
      this._ballx = game.ballX;
      this._bally = game.ballY;
    });
    this.socketService.listenToServer(GameEvents.status).subscribe((game) => {
      this.status = game.status;
    });
    this.socketService.listenToServer(GameEvents.move).subscribe((game) => {
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
          this.socketService.emitToServer(GameEvents.move, {
            player: this.playerService.playerValue,
            direction: keyEvent.code,
          });
        }
      });
    this.socketService.listenToServer(GameEvents.score).subscribe((game) => {
      this.goal = game.goal;
      if (game.goal)
        game.goal == 'goalL'
          ? (this.boxShadowStyle = '10px 0px red')
          : (this.boxShadowStyle = '-10px 0px red');
      setTimeout(() => {
        this.boxShadowStyle = '';
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
