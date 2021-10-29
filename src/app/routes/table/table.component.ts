import { Component, OnInit } from '@angular/core';
import { MyService } from '../../services/my.service';
import { User } from '../../user';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../../components/dialog/dialog-example/dialog-example.component';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	form: FormGroup;
	displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'emailAddress', 'action', 'action2'];	/** header tabella */
	dataSource: any;
	ELEMENT_DATA!: any;

	constructor(private myservice:MyService, public fb: FormBuilder, private http: HttpClient, public dialog: MatDialog, private snackBar: MatSnackBar) {
		this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

		this.form = fb.group({
			nome: ['', Validators.required],
			cognome: ['', Validators.required],
			telefono: ['', Validators.required],
			mail: ['', Validators.required]
		});
	}
 
	ngOnInit(): void {
		this.subTo();
	}

/** Load Tabella */
	loadTable() {
		this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
	}

/** Delete */
	deleteUser(/** id elemento */id:string) {
		if (confirm('Sei sicuro di volerlo eliminare?')) {
			this.http.delete('/api/users/' + id).subscribe((result) => {	/** passaggio dell'id dell'elemento da eliminare sul server */
				this.subTo();
			});
				this.openSnackBar('eliminato');
		} else {
			this.openSnackBar('nonEliminato');
		}
	}


/** Dialog per PUT */
	openDialogPut(/** id elemento selezionato */id:any) {
		const index = this.ELEMENT_DATA.find((res) => res.userId === id);
		const dialogRef = this.dialog.open(DialogExampleComponent, {	/** apertura Dialog */
			data: index
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result.userId != undefined) {
				this.http.put('/api/users/' + id, result).subscribe((res) => {	/** chiusura Dialog */
					this.subTo();
				});
				this.openSnackBar('modificato');
			}
		});
	}

/** Dialog per POST */
	openDialogPost() {
		const flag = true;
		const dialogRef = this.dialog.open(DialogExampleComponent, {
			data: flag
		});

		dialogRef.afterClosed().subscribe((result) => {
			this.onSubmit(result);
		});
	}

/** POST,
 * riceve dati da Dialog
*/
	onSubmit(array:any) {
		const firstName = array.firstName;
		const lastName = array.lastName;
		const phoneNumber = array.phoneNumber;
		const emailAddress = array.emailAddress;
		const newUser = { userId: uuidv4(), firstName, lastName, phoneNumber, emailAddress };
		this.ELEMENT_DATA.push(newUser);
		this.http.post('/api/users', newUser).subscribe((result) => {
			this.loadTable();
			this.openSnackBar('inserito');
		},
		(error) => {
			alert('Errore');
			this.subTo();
		});
		this.clearForm();
	}

/** Clear del form */
	clearForm() {
		this.form.reset();
	}
 
/** Chiamata a servizio */
	subTo() {
		this.myservice.getInformation().subscribe(
			(response) => {
				this.ELEMENT_DATA = response;
				this.loadTable();
			},
			(error) => {
				this.openSnackBar('erroreTab');
			}
		);
	}
 
/** Snackbar */
	openSnackBar(/** string passata da funzioni per selezionare evento */check:string){
		let config = new MatSnackBarConfig();
		config.panelClass = 'simple-snack-bar';
		if(check=='inserito'){
			this.snackBar.open('Inserito Utente con successo', '', {
				panelClass: 'success',
				horizontalPosition: 'center',
				duration:5000,
			});
		}else if(check=='erroreTab'){
			this.snackBar.open('Errore caricamento tabella', '', {
				panelClass: 'error',
				horizontalPosition: 'center',
				duration:5000,
			});
		}else if(check=='modificato'){
			this.snackBar.open('Utente modificato', '', {
				panelClass: 'info',
				horizontalPosition: 'center',
				duration:5000,
			});
		}else if(check=='eliminato'){
			this.snackBar.open('Utente eliminato', '', {
				panelClass: 'success',
				horizontalPosition: 'center',
				duration:5000,
			});
		}else if(check=='nonEliminato'){
			this.snackBar.open('Nessun utente è stato eliminato', '', {
				panelClass: 'info',
				horizontalPosition: 'center',
				duration:5000,
			});
		}else{
			alert('Errore');
		}
	}

}


// PROMISE TO GET INFO BY JSON

//  async getInformation(): Promise<void> {
//     this.ELEMENT_DATA = await this.myservice.getInformation()
//     console.log(this.ELEMENT_DATA)
//     this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
//   }
