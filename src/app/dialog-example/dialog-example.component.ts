import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableComponent } from '../table/table.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
	selector: 'app-dialog-example',
	templateUrl: './dialog-example.component.html',
	styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {
  form: FormGroup;
  title:any;
 
  constructor(public dialogRef: MatDialogRef<TableComponent>, @Inject(MAT_DIALOG_DATA) public data:any, public fb: FormBuilder) {
  	this.form = fb.group({
  		// 'id': [data.userId, Validators.compose([Validators.required,Validators.minLength(1)])],
  		nome: [data.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
  		cognome: [data.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
  		telefono: [data.phoneNumber, Validators.compose([Validators.required, Validators.minLength(5)])],
  		mail: [data.emailAddress, Validators.compose([Validators.required, Validators.minLength(5)])]
  	});
  	console.log(data);
  }
 
  ngOnInit(): void {
  	if (this.data === true) {
  		this.title = 'aggU';
  	} else {
  		this.title = 'modU';
  	}
  }


  onNoClick(): void {
  	this.dialogRef.close();
  }

  save() {
  	if (this.data === true) {
  		const firstName = this.form.controls['nome'].value;
  		const lastName = this.form.controls['cognome'].value;
  		const phoneNumber = this.form.controls['telefono'].value;
  		const emailAddress = this.form.controls['mail'].value;
  		this.dialogRef.close({ firstName, lastName, phoneNumber, emailAddress });
  	} else {
  		if (this.form.valid) {
  			const userId = this.data.userId;
  			const firstName = this.form.controls['nome'].value;
  			const lastName = this.form.controls['cognome'].value;
  			const phoneNumber = this.form.controls['telefono'].value;
  			const emailAddress = this.form.controls['mail'].value;
  			this.dialogRef.close({ userId, firstName, lastName, phoneNumber, emailAddress });
  		} else {
  			console.log('Attenzione', this.form.errors);
  		}
  	}
  }
}
