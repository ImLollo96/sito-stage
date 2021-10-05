import { Component, OnInit } from '@angular/core';
import { MyService } from '../my.service';
import { User } from '../user';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';
import { v4 as uuidv4 } from 'uuid';


@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  form: FormGroup;

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber', 'emailAddress', 'action', 'action2'];
  dataSource: any;
  ELEMENT_DATA!: any;

  constructor(private myservice:MyService, public fb: FormBuilder, private http: HttpClient, public dialog: MatDialog) {
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

  // LOAD TABLE
  loadTable() {
  	console.log(this.ELEMENT_DATA);
  	this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  }

  // POST ELEMENT IN API
  onSubmit(array:any) {
  	const firstName = array.firstName;
  	const lastName = array.lastName;
  	const phoneNumber = array.phoneNumber;
  	const emailAddress = array.emailAddress;
  	const newUser = { userId: uuidv4(), firstName, lastName, phoneNumber, emailAddress };
  	this.ELEMENT_DATA.push(newUser);
  	this.http.post('/api/users', newUser).subscribe((result) => {
  		this.loadTable();
  		console.log(this.ELEMENT_DATA);
  	},
  	(error) => {
  		alert('Errore');
  		this.subTo();
  	});
  	this.clearForm();
  }

  // CLEAR FORM
  clearForm() {
  	this.form.reset();
  }
  // DELETE ELEMENT
  deleteUser(id:any) {
  	console.log(id);
  	if (confirm('Sei sicuro di volerlo eliminare?')) {
  		this.http.delete('/api/users/' + id).subscribe((result) => {
  			this.subTo();
  		});
  	} else {
  		console.log('NO');
  	}
  }


  // PUT, UPDATE ELEMENT
  openDialogPut(id:any) {
  	console.log(id);
  	const index = this.ELEMENT_DATA.find((res) => res.userId === id);
  	const dialogRef = this.dialog.open(DialogExampleComponent, {
  		data: index
  	});

  	dialogRef.afterClosed().subscribe((result) => {
  		console.log('Result: ', result);
  		if (result.userId != undefined) {
  			this.http.put('/api/users/' + id, result).subscribe((res) => {
  				this.subTo();
  			});
  		}
  	});
  }

  // DIALOG POST
  openDialogPost() {
  	const flag = true;
  	const dialogRef = this.dialog.open(DialogExampleComponent, {
  		data: flag
  	});

  	dialogRef.afterClosed().subscribe((result) => {
  		this.onSubmit(result);
  	});
  }


  // REALOAD TABLE FROM API
  subTo() {
  	this.myservice.getInformation().subscribe(
  		(response) => {
  			this.ELEMENT_DATA = response;
  			this.loadTable();
  		},
  		(error) => {
  			alert('Errore');
  		}
  	);
  }
}


// PROMISE TO GET INFO BY JSON

//  async getInformation(): Promise<void> {
//     this.ELEMENT_DATA = await this.myservice.getInformation()
//     console.log(this.ELEMENT_DATA)
//     this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
//   }
