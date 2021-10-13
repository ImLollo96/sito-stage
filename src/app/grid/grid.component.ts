import { Component, OnInit } from '@angular/core';
import { MyService } from '../my.service';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DialogGridComponent } from '../dialog-grid/dialog-grid.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
	selector: 'app-grid',
	templateUrl: './grid.component.html',
	styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  breakpoint!: number;
  DATA_ELEMENT!: Array<any>;
  showButton: boolean = false;
  loader= true;
  totalCount = 10;
  color:any;

  constructor(private myservice:MyService, private http: HttpClient, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
  	if (window.innerWidth <= 500) {
  		this.breakpoint = 1;
  	} else if (window.innerWidth <= 1025) {
  		this.breakpoint = 2;
  	} else {
  		this.breakpoint = 3;
  	}
  	this.loadGrid();
  	this.loader = false;
  }

  onResize(event:any) {
  	if (event.target.innerWidth <= 500) {
  		this.breakpoint = 1;
  	} else if (event.target.innerWidth <= 1025) {
  		this.breakpoint = 2;
  	} else {
  		this.breakpoint = 3;
  	}
  }

  loadGrid() {
  	this.myservice.getDati().subscribe(
  		(response) => {
  			this.DATA_ELEMENT = response;
  		},
  		(error) => {
  			this.openSnackBar('errorePost');
  		}
  	);
  }

  onSubmit(array:any) {
  	const id = uuidv4();
  	const icon = array.icon;
  	const title = array.title;
  	const position = array.position;
  	const image = array.image;
  	const post = array.post;
  	const newGrid = { id, icon, title, position, post, image };
  	this.DATA_ELEMENT.push(newGrid);
  	this.http.post('/api/grid/v2', newGrid).subscribe((result) => {
  		this.loadGrid();
  		console.log(this.DATA_ELEMENT);
		this.openSnackBar('inserito');
  	},
  	(error) => {
  		alert('Errore');
  		this.loadGrid();
  	});
  }

  // POST GRID
  openDialogPost() {
  	const flag = true;
  	const dialogRef = this.dialog.open(DialogGridComponent, {
  		data: flag
  	});

  	dialogRef.afterClosed().subscribe((result) => {
  		this.onSubmit(result);
  	});
  }

  // PUT, UPDATE GRID
  openDialogPut(id:any) {
  	console.log(id);
  	const arr = this.DATA_ELEMENT.find((res) => res.id === id);
  	const dialogRef = this.dialog.open(DialogGridComponent, {
  		data: arr
  	});

  	dialogRef.afterClosed().subscribe((result) => {
  		console.log('Result: ', result);
  		if (result.id != null) {
  			this.http.put('/api/grid/' + id, result).subscribe((res) => {
  				this.loadGrid();
  				window.location.reload();
  			});
			this.openSnackBar('modificato');
  		}
  	});
  }

  //SNACKBAR
  openSnackBar(check){
	let config = new MatSnackBarConfig();
	config.panelClass = 'simple-snack-bar';
	if(check=='inserito'){
		this.snackBar.open('Inserito Nuovo Post con successo', '', {
			panelClass: 'success',
			horizontalPosition: 'center',
			duration:5000,
		});
	}else if(check=='errorePost'){
		this.snackBar.open('Errore caricamento Post', '', {
			panelClass: 'error',
			horizontalPosition: 'center',
			duration:5000,
		});
	}else if(check=='modificato'){
		this.snackBar.open('Post modificato', '', {
			panelClass: 'info',
			horizontalPosition: 'center',
			duration:5000,
		});
	}else{
		alert('Errore');
	}
  }
}


// async getDati(): Promise<void> {
//   this.DATA_ELEMENT = await this.myservice.getDati()
//   console.log(this.DATA_ELEMENT)
// }
