import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableComponent } from '../../../routes/table/table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
	selector: 'app-dialog-grid',
	templateUrl: './dialog-grid.component.html',
	styleUrls: ['./dialog-grid.component.css']
})
export class DialogGridComponent implements OnInit {

  form: FormGroup;
  url:any;
  image!:File;
  titolo!:string;
  let:any; 

	constructor(public dialogRef: MatDialogRef<TableComponent>, @Inject(MAT_DIALOG_DATA) public data:any, public fb: FormBuilder, private snackBar: MatSnackBar) {
		/** Mostra nella form i valori e controllo rispetto parametri */
		this.form = fb.group({
			title: [data.title, Validators.compose([Validators.required, Validators.minLength(2)])],
			position: [data.position, Validators.compose([Validators.required, Validators.minLength(2)])],
			post: [data.post, Validators.compose([Validators.required, Validators.minLength(2)])],
			image: [data.image, Validators.compose([Validators.required])]
		});
		this.url = data.image;
	}

	ngOnInit(): void {
		if (this.data === true) {
			this.titolo = 'aggP';
		} else {
			this.titolo = 'modP';
		}
	}

/** Chiusura Dialog senza passaggio dati */
	onNoClick(): void {
		this.dialogRef.close();
	}

/** Collect del file */
	onselectFile(e) {
		this.image = <File>e.target.files[0];
		if (e.target.files) {
			var reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = (event:any) => {
				this.url = event.target.result;
			};
		}
	}

/** Salvataggio dati inseriti da utente e passaggio dati a Grid */
	async save() {
		if (this.data === true) {
			if (this.form.valid) {
				const icon = 'https://previews.123rf.com/images/sudowoodo/sudowoodo2003/sudowoodo200300038/142224178-cute-cartoon-character-working-from-home-remote-work-and-telecommuting-or-freelance-job-isolated-vec.jpg';
				const title = this.form.controls['title'].value;
				const position = this.form.controls['position'].value;
				const post = this.form.controls['post'].value;
				const image = this.url;
				this.dialogRef.close({ icon, title, position, post, image });
			} else {
				this.form.controls['title'].markAsTouched();
				this.form.controls['position'].markAsTouched();
				this.form.controls['post'].markAsTouched();
				this.form.controls['image'].markAsTouched();
				this.openSnackBar('error');
			}
		} else {
			if (this.form.valid) {
				const id = this.data.id;
				const icon = 'https://previews.123rf.com/images/sudowoodo/sudowoodo2003/sudowoodo200300038/142224178-cute-cartoon-character-working-from-home-remote-work-and-telecommuting-or-freelance-job-isolated-vec.jpg';
				const title = this.form.controls['title'].value;
				const position = this.form.controls['position'].value;
				const post = this.form.controls['post'].value;
				const image = this.url;
				this.dialogRef.close({ id, icon, title, position, post, image });
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
