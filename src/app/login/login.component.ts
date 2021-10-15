import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	form: FormGroup;
	user!: gapi.auth2.GoogleUser;

	constructor(public fb: FormBuilder, private authService: AuthService, private ref: ChangeDetectorRef, private snackBar: MatSnackBar) {
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

/** Log In con account Standard */
	checkLogin() {
		const username = this.form.controls['username'].value;
		const password = this.form.controls['password'].value;
		const app = this.authService.isLogged(username, password);

		if (app == false) {
			this.openSnackBar();
		}
	}

/** Log In con Google */
	signIn() {
		this.authService.signIn();
	}

/** Snackbar */
	openSnackBar(){
		let config = new MatSnackBarConfig();
		config.panelClass = 'simple-snack-bar';
		this.snackBar.open('Errore, username o password sbagliati', '', {
			panelClass: 'error',
			horizontalPosition: 'center',
			duration:5000,
		});
	}

}


