import { Component, Inject, OnInit } from '@angular/core';
import { StaffPageComponent } from '../staff-page/staff-page.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-staff',
  templateUrl: './dialog-staff.component.html',
  styleUrls: ['./dialog-staff.component.css']
})
export class DialogStaffComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<StaffPageComponent>, @Inject(MAT_DIALOG_DATA) public data:any, public fb: FormBuilder) { 
    this.form = fb.group({
      user: [data.user, Validators.compose([Validators.required, Validators.minLength(2)])],
      password: [data.pass, Validators.compose([Validators.required, Validators.minLength(5)])],
      nome: [data.name, Validators.compose([Validators.required, Validators.minLength(2)])],
      cognome: [data.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
      mail: [data.email, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ngOnInit(): void {
  }

/** Chiusura Dialog senza passaggio dati */
  onNoClick(){
    this.dialogRef.close();
  }

/** Salvataggio dati inseriti da utente e passaggio a Staff */
  save() {
    if (this.form.valid) {
      const id = this.data.id;
      const name = this.form.controls['nome'].value;
      const lastName = this.form.controls['cognome'].value;
      const user = this.form.controls['user'].value;
      const pass = this.form.controls['password'].value;
      const emailAddress = this.form.controls['mail'].value;
      this.dialogRef.close({ id, name, lastName, user, pass, emailAddress });
    } else {
      console.log('Attenzione', this.form.errors);
    }
  }

}
