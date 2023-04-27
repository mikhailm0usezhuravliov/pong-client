import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, GameEvents } from '../shared/game';
import * as socketIo from 'socket.io-client';
import { environment } from '../../environments/environment';
const url = 'ws://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  // private clientSocket: SocketService.Socket;
  private clientSocket;

  constructor() {
    this.clientSocket = socketIo.connect(environment.serviceWorkerApi);
  }

  listenToServer(gameEvents: GameEvents): Observable<Game> {
    return new Observable((subscribe) => {
      this.clientSocket.on(gameEvents, (data: Game) => {
        subscribe.next(data);
      });
    });
  }
  emitToServer(event: GameEvents, data?: any): void {
    this.clientSocket.emit(event, data ? data : null);
  }
}
