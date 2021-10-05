import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user!: gapi.auth2.GoogleUser

  constructor(public fb: FormBuilder, private authService: AuthService, private ref: ChangeDetectorRef) {
  	this.form = fb.group({
  		username: ['', Validators.required],
  		password: ['', Validators.required]
  	});
  }

  ngOnInit(): void {
  	this.authService.observable().subscribe((user) => {
  		this.user = user;
  		this.ref.detectChanges();
  	});
  }

  checkLogin() {
  	const username = this.form.controls['username'].value;
  	const password = this.form.controls['password'].value;
  	const app = this.authService.isLogged(username, password);
  	if (app == false) {
  		alert('Riprova');
  	}
  }

  signIn() {
  	this.authService.signIn();
  }
}
