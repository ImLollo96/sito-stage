import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyService } from '../my.service';
import { AuthService } from '../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-staff-page',
  templateUrl: './staff-page.component.html',
  styleUrls: ['./staff-page.component.css']
})
export class StaffPageComponent implements OnInit {

  displayedColumns: string[] = ['name', 'lastName', 'user', 'password', 'email'];
  form!: FormGroup;
  DATA_ELEMENT: any;
  id = localStorage.getItem('userIn');
  dataSource: any;
  show = false;

  constructor(public fb: FormBuilder, private myservice: MyService, private auth: AuthService, private http: HttpClient) {
    this.dataSource = new MatTableDataSource<any>(this.DATA_ELEMENT);
    //this.auth.subTo();
    this.subTo();
    
  }

  ngOnInit(): void {
    
    this.fillUpData();
  }

  loadTable() {
  	console.log(this.DATA_ELEMENT);
    this.dataSource = new MatTableDataSource<any>(this.DATA_ELEMENT);
  }

  changeShow(){
    if(this.show==false){
      this.show= true;
    }else{
      this.show = false;
    }
  }

  subTo() {
  	this.myservice.getPass().subscribe(
  		(response) => {
  			this.DATA_ELEMENT = response;
  			this.loadTable();
  		},
  		(error) => {
  			alert('Error');
  		}
  	);
  }

  fillUpData() {
    const array = this.auth.DATA_ELEMENT.find((x) => x.id == this.id);
    this.form = this.fb.group({
      user: [array.user, Validators.compose([Validators.required, Validators.minLength(2)])],
      password: [array.pass, Validators.compose([Validators.required, Validators.minLength(5)])],
      nome: [array.name, Validators.compose([Validators.required, Validators.minLength(2)])],
      cognome: [array.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
      mail: [array.email, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  onNoClick(){
    this.fillUpData();
  }

  save() {
    if (this.form.valid) {
      const id = this.id;
      const name = this.form.controls['nome'].value;
      const lastName = this.form.controls['cognome'].value;
      const user = this.form.controls['user'].value;
      const pass = this.form.controls['password'].value;
      const emailAddress = this.form.controls['mail'].value;
      const arr = ({ id, name, lastName, user, pass, emailAddress });
      console.log('ARR: ', arr);
      this.http.put('/api/password/' + id, arr).subscribe((res) => {
        this.auth.subTo();
        this.loadTable();
      });
    } else {
      console.log('Attenzione', this.form.errors);
    }
  }
}
