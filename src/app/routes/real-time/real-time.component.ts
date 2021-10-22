import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css']
})
export class RealTimeComponent implements OnInit {

  num:any=0;
  isSubscribe! : Subscription;

  constructor(private webSocket: WebsocketService) { }

  ngOnInit(): void {
    // this.webSocket.listen('test event').subscribe((data) => {
    //   this.update(data);
    //   console.log(data);
    // })
  }

  connect(){
    this.isSubscribe = this.webSocket.listen('random').subscribe((data) => {
      this.update(data);
      console.log(data);
    });
  }

  update(data){
    this.num=data;
  }

  disconnect(){
    this.webSocket.disconnectSocket();
  }

  ngOnDestroy(){
    console.log('DESTROY');
    this.webSocket.disconnectSocket();
    this.isSubscribe.unsubscribe();
  }
}
