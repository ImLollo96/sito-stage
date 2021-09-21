import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(public fb: FormBuilder,private authService: AuthService, private appC: AppComponent) { 
    
    this.form = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });

  }

  ngOnInit(): void{
    
    this.checkLogin();
  }
  
  checkLogin(){
    const username = this.form.controls['username'].value;
    const password = this.form.controls['password'].value;
    let app = this.authService.isLogged(username, password);
    if(app==false){
      alert("Riprova");
    }
  }

  turnOn(){
    this.appC.setOn();
  }

}
