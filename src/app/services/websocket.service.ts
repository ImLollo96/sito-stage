import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: any;
  readonly url = "ws://localhost:3001";

  constructor() { 
    
  }

  listen(eventName:string){
    this.socket = io(this.url);
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      })
    });
  }

  emit(eventName:string, data:any){
    this.socket.emit(eventName, data);
  }

  disconnectSocket(){
    this.socket.disconnect();
  }

}
