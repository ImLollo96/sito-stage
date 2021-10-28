import { Component, Inject, OnInit } from '@angular/core';
import { ChatComponent } from 'src/app/routes/chat/chat.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
 
@Component({
  selector: 'app-dialog-chat',
  templateUrl: './dialog-chat.component.html',
  styleUrls: ['./dialog-chat.component.css']
})
export class DialogChatComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<ChatComponent>, @Inject(MAT_DIALOG_DATA) public data:any, public fb: FormBuilder) { 
    /** Mostra nella form i valori e controllo rispetto parametri */
    this.form = fb.group({
      message: [data.message, Validators.compose([Validators.required, Validators.minLength(1)])]
    });
  }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

/** Salvataggio dati inseriti da utente e passaggio a Chat */
  save() {
    if (this.form.valid) {
      const id = this.data.id;
      const user = this.data.user;
      const message = this.form.controls['message'].value;
      const when = this.data.when;
      this.dialogRef.close({ id, user, message, when });
    } else {
      console.log('Attenzione', this.form.errors);
    }
  }

}
