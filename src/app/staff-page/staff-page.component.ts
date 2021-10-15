import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyService } from '../my.service';
import { AuthService } from '../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { DialogStaffComponent } from '../dialog-staff/dialog-staff.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.css']
})
export class StaffPageComponent implements OnInit {

  displayedColumns: string[] = ['name', 'lastName', 'user', 'password', 'email'];
  DATA_ELEMENT: any;
  id = localStorage.getItem('userIn');
  dataSource: any;
 

  constructor(public fb: FormBuilder, private myservice: MyService, private http: HttpClient, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<any>(this.DATA_ELEMENT);
  }

  ngOnInit(): void {
    this.subTo();
  }

/** Load tabella con dati utente loggato */  
  loadTable() {
    this.dataSource = new MatTableDataSource<any>(this.DATA_ELEMENT);
  }

/** Chiamato a servizio */
  subTo() {
    this.myservice.getPass().subscribe(
      (response) => {
        this.DATA_ELEMENT = response.filter((x) => x.id == this.id);
        this.loadTable();
      },
      (error) => {
        this.openSnackBar('error');
      }
    );
  }

/** Dialog e Put dati */
  openDialogPut() {
  	const id = localStorage.getItem('userIn');
  	const index = this.DATA_ELEMENT.find((res) => res.id === id);
  	const dialogRef = this.dialog.open(DialogStaffComponent, {
  		data: index
  	});

  	dialogRef.afterClosed().subscribe((result) => {
  		if (result.id != undefined) {
  			this.http.put('/api/password/' + id, result).subscribe((res) => {
  				this.subTo();
  			});
			this.openSnackBar('modificato');
  		}
  	});
  }

/** Snackbar */
  openSnackBar(check){
    let config = new MatSnackBarConfig();
    config.panelClass = 'simple-snack-bar';
     if(check=='modificato'){
      this.snackBar.open('Dati modificati', '', {
        panelClass: 'info',
        horizontalPosition: 'center',
        duration:5000,
      });
    }else if(check=='error'){
      this.snackBar.open('Errore', '', {
        panelClass: 'error',
        horizontalPosition: 'center',
        duration:5000,
      });
    }else{
      alert('Errore');
    }
  }
  
}
