import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableComponent } from '../table/table.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-dialog-grid',
	templateUrl: './dialog-grid.component.html',
	styleUrls: ['./dialog-grid.component.css']
})
export class DialogGridComponent implements OnInit {
  form: FormGroup;
  url:any='./assets/g-logo.png';
  image!:File;
  titolo:any;
  let:any;


  constructor(public dialogRef: MatDialogRef<TableComponent>, @Inject(MAT_DIALOG_DATA) public data:any, public fb: FormBuilder, private http: HttpClient) {
  	this.form = fb.group({
  		// 'icon': [data.icon, Validators.compose([Validators.required])],
  		title: [data.title, Validators.compose([Validators.required, Validators.minLength(2)])],
  		position: [data.position, Validators.compose([Validators.required, Validators.minLength(2)])],
  		post: [data.post, Validators.compose([Validators.required, Validators.minLength(2)])],
  		image: [data.image, Validators.compose([Validators.required])]
  	});
  	this.url = data.image;
  }

  ngOnInit(): void {
  	if (this.data === true) {
  		this.titolo = 'Aggiungi Post';
  	} else {
  		this.titolo = 'Modifica Post';
  	}
  }

  onNoClick(): void {
  	this.dialogRef.close();
  }

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

  async save() {
  	if (this.data === true) {
  		const icon = 'https://previews.123rf.com/images/sudowoodo/sudowoodo2003/sudowoodo200300038/142224178-cute-cartoon-character-working-from-home-remote-work-and-telecommuting-or-freelance-job-isolated-vec.jpg';
  		const title = this.form.controls['title'].value;
  		const position = this.form.controls['position'].value;
  		const post = this.form.controls['post'].value;
  		const image = this.url;
  		this.dialogRef.close({ icon, title, position, post, image });
  	} else {
  		if (this.form.valid) {
  			const id = this.data.id;
  			const icon = 'https://previews.123rf.com/images/sudowoodo/sudowoodo2003/sudowoodo200300038/142224178-cute-cartoon-character-working-from-home-remote-work-and-telecommuting-or-freelance-job-isolated-vec.jpg';
  			const title = this.form.controls['title'].value;
  			const position = this.form.controls['position'].value;
  			const post = this.form.controls['post'].value;
  			const image = this.url;
  			// const image = new FormData();
  			// image.append('image', this.image, this.image.name);
  			this.dialogRef.close({ id, icon, title, position, post, image });
  		} else {
  			console.log('Attenzione', this.form.errors);
  		}
  	}
  	// if(this.data===true){
  	//   const fd = new FormData();
  	//   fd.append('image', this.image, this.image.name);
  	//   this.http.post('/api/image', fd).subscribe(res =>{
  	//     console.log(res);
  	//   });
  	// }
  }
}
