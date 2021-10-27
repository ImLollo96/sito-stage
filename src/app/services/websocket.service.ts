import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: any;
  readonly url = "ws://localhost:3001";
 
  constructor() {}
 
/** Connessione a Socket.io */
  listen(/** richiesa tipo di servizio */eventName:string){
    this.socket = io(this.url);
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    });
  }

/** Passaggio dati al server */
  emit(eventName:string, data:any){
    this.socket.emit(eventName, (data:{user:string, message:string}) => {
      
    });
  }

  getMessage(/** richiesa tipo di servizio */eventName:string){
    //this.socket = io(this.url);
    return new Observable<{user:string, message:string}>((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    });
  }


/** Disconnessione da Socket.io */
  disconnectSocket(){
    this.socket.disconnect();
  }

}
