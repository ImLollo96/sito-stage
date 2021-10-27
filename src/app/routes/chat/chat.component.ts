import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import {io} from 'socket.io-client';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  today= new Date();
  jstoday = '';

  roomId!:string;
  messageText:string='';
  messageArray:{user:string, message:string, when:string}[]=[];

  socket:any;
  readonly url = "ws://localhost:3001";

  currentUser:string=JSON.stringify(localStorage.getItem('userName'));

  constructor(private snackBar: MatSnackBar) {
    this.socket = io(this.url);
    this.currentUser = JSON.parse(this.currentUser);
    this.receiveHistory();
    this.receiveMessage();
    
   }

  ngOnInit(): void { }

  ngAfterViewChecked() {        
    this.scrollToBottom(); 
  }
  
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  } 

  receiveHistory(){
    this.socket.on('message-history', (data) =>{
      for (var i = 0; i < data.length; i++) {
          var dati = data[i];
          this.messageArray.push({user: dati.user, message:dati.message, when: dati.when});
      } 
    });
  }

  receiveMessage(){
    this.socket.on('message-broadcast', (data:{user:string, message:string, when:string}) =>{
      if(data){
        this.messageArray.push({user: data.user, message:data.message, when:data.when});
        this.playSound();
      }
    });
    
  }

  sendMessage(){
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy HH:mm:ss a', 'en-US', '+0200');
    console.log('ORA: ', this.jstoday);
    if(this.messageText!=''){
      this.socket.emit('message', {user:this.currentUser, message:this.messageText, when:this.jstoday});
      this.messageArray.push({user: this.currentUser, message:this.messageText, when:this.jstoday});
      this.messageText = '';
    }else{
      this.openSnackBar('inserire')
    }
  }

  playSound(){
    let audio = new Audio();
    audio.src = "../assets/bell.wav";
    audio.load();
    audio.play();
  }


  /** Snackbar */
	openSnackBar(/** string passata da funzioni per selezionare evento */check:string){
		let config = new MatSnackBarConfig();
		config.panelClass = 'simple-snack-bar';
		if(check=='inserire'){
			this.snackBar.open('Scrivere un messaggio', '', {
				panelClass: 'error',
				horizontalPosition: 'center',
				duration:5000,
			});
		}else{
			alert('Errore');
		}
	}

 
}
