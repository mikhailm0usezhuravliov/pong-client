import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, GameEvents } from '../shared/game';
import * as socketIo from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {

  private clientSocket;

  constructor() {
    this.clientSocket = socketIo.connect(environment.serviceWorkerApi);
  }

  listenToServer(gameEvents: GameEvents): Observable<any> {
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
