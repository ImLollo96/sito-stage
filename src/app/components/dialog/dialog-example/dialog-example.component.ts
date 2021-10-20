import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableComponent } from '../../../routes/table/table.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
	selector: 'app-dialog-example',
	templateUrl: './dialog-example.component.html',
	styleUrls: ['./dialog-example.component.css']
})
export class DialogExampleComponent implements OnInit {

	form: FormGroup;
	title!:string;
 
	constructor(public dialogRef: MatDialogRef<TableComponent>, @Inject(MAT_DIALOG_DATA) public data:any, public fb: FormBuilder, private snackBar: MatSnackBar) {
		/** Mostra nella form i valori e controllo rispetto parametri */
		this.form = fb.group({
			nome: [data.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
			cognome: [data.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
			telefono: [data.phoneNumber, Validators.compose([Validators.required, Validators.minLength(5)])],
			mail: [data.emailAddress, Validators.compose([Validators.required, Validators.minLength(5)])]
		});
	}
 
	ngOnInit(): void {
		if (this.data === true) {
			this.title = 'aggU';
		} else {
			this.title = 'modU';
		}
	}

/** Chiusura Dialog senza passaggio dati */
	onNoClick(): void {
		this.dialogRef.close();
	}

/** Salvataggio dei dati inseriti da utente e invio a Table */
	save() {
		if (this.data === true) {
			if (this.form.valid) {
				const firstName = this.form.controls['nome'].value;
				const lastName = this.form.controls['cognome'].value;
				const phoneNumber = this.form.controls['telefono'].value;
				const emailAddress = this.form.controls['mail'].value;
				this.dialogRef.close({ firstName, lastName, phoneNumber, emailAddress });
			} else {
				this.form.controls['nome'].markAsTouched();
				this.form.controls['cognome'].markAsTouched();
				this.form.controls['telefono'].markAsTouched();
				this.form.controls['mail'].markAsTouched();
				this.openSnackBar('error');
			}
		} else {
			if (this.form.valid) {
				const userId = this.data.userId;
				const firstName = this.form.controls['nome'].value;
				const lastName = this.form.controls['cognome'].value;
				const phoneNumber = this.form.controls['telefono'].value;
				const emailAddress = this.form.controls['mail'].value;
				this.dialogRef.close({ userId, firstName, lastName, phoneNumber, emailAddress });
			} else {
				this.openSnackBar('error');
			}
		}
	}


/** Snackbar */
	openSnackBar(/** string passata da funzioni per selezionare evento */check:string){
		let config = new MatSnackBarConfig();
		config.panelClass = 'simple-snack-bar';
		if(check=='error'){
			this.snackBar.open('Compilare tutti i campi', '', {
				panelClass: 'error',
				horizontalPosition: 'center',
				duration:5000,
			});
		}else{
			alert('Errore');
		}
	}
}
