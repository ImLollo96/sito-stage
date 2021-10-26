import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  roomId!:string;
  messageText:string='';
  messageArray:{user:string, message:string}[]=[{user:"pippo",message:"cicco"}];

  currentUser=localStorage.getItem('userName');

  constructor(private webSocket: WebsocketService) { }

  ngOnInit(): void {
    this.webSocket.listen('join').subscribe((data) => {
      console.log('loggato');
    });
    this.webSocket.getMessage('get message').subscribe((data: {user:string, message:string}) => {
      this.messageArray.push(data);
    });
  }


  sendMessage(){
    this.webSocket.emit('message',{data:this.currentUser, message:this.messageText});
  }

 
}
