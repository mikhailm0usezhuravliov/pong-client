import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../../../common/game';
import * as socketIo from 'socket.io-client';
const url = "ws://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  // private clientSocket: SocketService.Socket;
  private clientSocket;

  constructor() {
    this.clientSocket = socketIo.connect(url);
  }

  listenToServer (move:string):Observable<Game> {
    return new Observable((subscribe) => {
      this.clientSocket.on(move, (data:Game) => {
        subscribe.next(data);
      })
    })
  }
  emitToServer(event:string, data?: any):void {
    this.clientSocket.emit(event, data ? data : null);
  }
}
