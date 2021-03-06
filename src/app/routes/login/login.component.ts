import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

declare var FB: any;
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
		/** Gestione login Google */
		this.authService.observable().subscribe((user) => {
			this.user = user;
			this.ref.detectChanges();
		});
	}

/** Log In con account Standard */
	checkLogin() {
		const username = this.form.controls['username'].value;
		const password = this.form.controls['password'].value;
		const app = this.authService.isLogged(username, password); /** passa al servizio i dati inseriti dall'utente e ritorna boolean */

		if (app == false) {
			this.openSnackBar('error');
		}
	}

/** Log In con Google */
	signIn() {
		this.authService.signIn();
	}

/** Log In con Microsoft */
	singInMicro(){
		this.authService.logInMicro();
	}
/** Controllo accesso con Microsoft */
	checkMicro(): boolean{
		return this.authService.isLoggedMicro();
	}

/** Snackbar */
	openSnackBar(check){
		let config = new MatSnackBarConfig();
		config.panelClass = 'simple-snack-bar';
		if(check == 'error'){
			this.snackBar.open('Errore, username o password sbagliati', '', {
				panelClass: 'error',
				horizontalPosition: 'center',
				duration:5000,
			});
		}
	}

}


