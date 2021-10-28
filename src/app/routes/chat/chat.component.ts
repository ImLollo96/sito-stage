import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {io} from 'socket.io-client';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {formatDate } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { DialogChatComponent } from 'src/app/components/dialog/dialog-chat/dialog-chat.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  colorbg:any = localStorage.getItem('colorUsed');
  text:any = localStorage.getItem('textUsed');

  today= new Date();
  jstoday = '';

  roomId!:string;
  messageText:string='';
  messageArray:{id:string, user:string, message:string, when:string}[]=[];
  counter:number = 0;

  socket:any;
  readonly url = "ws://localhost:3001";

  currentUser:string=JSON.stringify(localStorage.getItem('userName'));

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
    this.socket = io(this.url);
    this.currentUser = JSON.parse(this.currentUser);
    this.receiveHistory();
    this.receiveMessage();
   }

  ngOnInit(): void { 
    
  }

  ngAfterViewChecked() {        
    setInterval(() => {
      this.scrollToBottom();
    }, 1500);
  }
  
  scrollToBottom() {
    if(this.counter == 0){
        window.scrollTo(0,document.body.scrollHeight);
        this.counter = this.counter + 1;
    }
  } 

  receiveHistory(){
    this.socket.on('message-history', (data) =>{
      this.messageArray = [];
      for (var i = 0; i < data.length; i++) {
          var dati = data[i];
          this.messageArray.push({id: dati.id, user: dati.user, message:dati.message, when: dati.when});
      } 
    });
  }

  receiveMessage(){
    this.socket.on('message-broadcast', (data:{id:string, user:string, message:string, when:string}) =>{
      if(data){
        this.messageArray.push({id: data.id, user: data.user, message:data.message, when:data.when});
        this.playSound();
        this.counter = 0;
      }
    });
  }

  sendMessage(){
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy HH:mm:ss', 'en-US', '+0200');
    let id = uuidv4();
    if(this.messageText!=''){
      this.socket.emit('message', {id: id,user:this.currentUser, message:this.messageText, when:this.jstoday});
      this.messageArray.push({id: id, user: this.currentUser, message:this.messageText, when:this.jstoday});
      this.messageText = '';
      this.counter = 0;
    }else{
      this.openSnackBar('inserire')
    }
  }

  deleteMessage(id){
    this.socket.emit('delete', id);
  }

  editMessage(id){
    const index = this.messageArray.find((res) => res.id === id);
    const dialogRef = this.dialog.open(DialogChatComponent, {	/** apertura Dialog */
			data: index
		});

    dialogRef.afterClosed().subscribe((result) => {
			if (result.id != undefined) {
        this.socket.emit('edit', id, result);
        this.openSnackBar('modificato');
			}
		});
    
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
		}else if(check=='modificato'){
			this.snackBar.open('Messaggio modificato', '', {
				panelClass: 'success',
				horizontalPosition: 'center',
				duration:5000,
			});
		}else{
			alert('Errore');
		}
	}
}
