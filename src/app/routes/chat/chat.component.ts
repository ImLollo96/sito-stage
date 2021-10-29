import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import {io} from 'socket.io-client';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {formatDate } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { DialogChatComponent } from 'src/app/components/dialog/dialog-chat/dialog-chat.component';
import { MyService } from 'src/app/services/my.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('menu') menu!:ElementRef;  /** creazione element per il menu */
  

  colorbg:any = localStorage.getItem('colorUsed');  /** get primary color */
  text:any = localStorage.getItem('textUsed');  /** get colore del testo in base al primary color */

  today= new Date();  /** Data per il messaggio */
  jstoday = '';

  id:any; /** id del messaggio selezionato */
  messageText:string='';  /** testo scritto nel textarea */
  messageArray:any; /** Array contente i messaggi */
  counter:number = 0; /** gestione dello scroll automatico della pagina */

  socket:any; 
  readonly url = "ws://localhost:3001";
  currentUser:string=JSON.stringify(localStorage.getItem('userName'));  /** get get username dell'utente loggato */

  constructor(private snackBar: MatSnackBar, public dialog: MatDialog, private myService: MyService) {
    this.socket = io(this.url); /** inizializzazione del socket */
    this.currentUser = JSON.parse(this.currentUser);
    this.receiveMessage();
    this.receiveHistory();
   }

  ngOnInit(): void { 
    this.deleteBroadcast();
    this.editBroadcast();
  }

  ngAfterViewChecked() {  
    setInterval(() => {
      this.scrollToBottom();
    }, 500);
  }
  
  /** Scroll automatico della pagina */
  scrollToBottom() {
    if(this.counter == 0){
        window.scrollTo(0,document.body.scrollHeight);
        this.counter = this.counter + 1;
    }
  }

  /** ContextMenu CUSTOM */
  contextMenu(e:any, id){
    this.id = id;
    e.preventDefault();
    this.menu.nativeElement.style.display = "block";
    this.menu.nativeElement.style.top = e.pageY - window.pageYOffset + "px";
    if(window.innerWidth< 1000){
      this.menu.nativeElement.style.left = e.pageX - 150 + "px";
    }else{
      this.menu.nativeElement.style.left = e.pageX + "px";
    }
  }

  /** Chiurusa ContextMenu CUSTOM */
  disappearContext(){
    this.menu.nativeElement.style.display = "none";
  }

  /** GET history dei messaggi */
  receiveHistory(){
    this.myService.getMessage().subscribe(
			(response) => {
				this.messageArray = response;
			},
			(error) => {
        console.log(error);
				this.openSnackBar('errore');
			}
		);
  }

  /** Recupera eventuali nuovi messaggi inviati */
  receiveMessage(){
    this.socket.on('message-broadcast', (data:{id:string, user:string, message:string, when:string}) =>{
      if(data){
        this.messageArray.push({id: data.id, user: data.user, message:data.message, when:data.when});
        if(data.user != this.currentUser){
          this.playSound();
        }
        this.counter = 0;
      }
    });
  }

  /** Manda al socket il messaggio inserito e lo aggiunge all'array */
  sendMessage(){
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy HH:mm:ss', 'en-US', '+0200');
    let id = uuidv4();
    if(this.messageText!=''){
      this.socket.emit('message', {id: id,user:this.currentUser, message:this.messageText, when:this.jstoday});
      this.messageArray.push({id: id, user: this.currentUser, message:this.messageText, when:this.jstoday});
      this.messageText = '';
      this.counter = 0;
    }else{
      //this.openSnackBar('inserire')
    }
  }

  /** Elimina il messaggio selezionato sia sul server che in locale */
  deleteMessage(){
    this.menu.nativeElement.style.display = "none";
    console.log('ID DELETE: ', this.id);
    this.socket.emit('delete', this.id);
    const index = this.messageArray.findIndex((res) => res.id === this.id);
    this.messageArray.splice(index, 1);
  }

  /** Recupera dal server eventuali messaggi eliminati */
  deleteBroadcast(){
    this.socket.on('message-delete', (id) =>{
      const index = this.messageArray.findIndex((res) => res.id === id);
      this.messageArray.splice(index, 1);
    });
  }

  /** Modifica il messaggio selezionato sia sul server che in locale */
  editMessage(){
    this.menu.nativeElement.style.display = "none";
    const index = this.messageArray.find((res) => res.id === this.id);
    const dialogRef = this.dialog.open(DialogChatComponent, {	/** apertura Dialog */
			data: index
		});

    dialogRef.afterClosed().subscribe((result) => {
			if (result.id != undefined) {
        this.socket.emit('edit',this.id, result);
        const arr = this.messageArray.find((res) => res.id === this.id);
        const dt = arr;
        dt.id = result.id;
        dt.user = result.user;
        dt.message = result.message;
        dt.when = result.when;
        //this.openSnackBar('modificato');
			}
		});
  }

  /** Recupera dal server eventuali messaggi modificati */
  editBroadcast(){
    this.socket.on('message-edit', (id, data) =>{
      const arr = this.messageArray.find((res) => res.id === id);
      const dt = arr;
      dt.id = data.id;
      dt.user = data.user;
      dt.message = data.message;
      dt.when = data.when;
    });
  }

  /** Notifica messaggi */
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
				duration:2000,
			});
		}else if(check=='modificato'){
			this.snackBar.open('Messaggio modificato', '', {
				panelClass: 'success',
				horizontalPosition: 'center',
				duration:2000,
			});
		}else if(check=='errore'){
			this.snackBar.open('Errore load Chat', '', {
				panelClass: 'error',
				horizontalPosition: 'center',
				duration:2000,
			});
		}else{
			alert('Errore');
		}
	}
}
