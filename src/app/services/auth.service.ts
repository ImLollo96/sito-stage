import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MyService } from './my.service';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-common';

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	private auth2!: gapi.auth2.GoogleAuth;
	private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);
	DATA_ELEMENT: any;
	//isAuthenticated:boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false');
	isAuthenticated: any = localStorage.getItem('loggedIn') || 'false';


	constructor(private router: Router, private snackBar: MatSnackBar, private http: HttpClient, private myservice: MyService, private msalService: MsalService) {
		/** Load API GOOGLE */
		gapi.load('auth2', () => {
			this.auth2 = gapi.auth2.init({
				client_id: '111898526119-bip3c2ncalj0hfe5s3k4cop1dde36tok.apps.googleusercontent.com'
			});
		});
		this.subTo();
	}

/* #region --------------- ACCOUNT STANDARD --------------- */

	/** Chiamata a servizio per Login */
	subTo() {
		this.myservice.getPass().subscribe(
			(response) => {
				this.DATA_ELEMENT = response;
			},
			(error) => {
				alert('Errore');
			}
		);
	}

	/** Servizio controllo credenziali Login */
	public isLogged(/** username inserito da utente */u: string, /** password inserita da utente */ p: string) {
		if (this.DATA_ELEMENT.find((x) => x.user == u)) {	/** cerca corrispondenze */
			if (this.DATA_ELEMENT.find((x) => x.pass == p)) {
				this.isAuthenticated = 'standard';
				let index = this.DATA_ELEMENT.find((x) => x.user == u);
				let id = index.id; /** prende l'id di chi ha fatto l'accesso */
				console.log('Il mio id', id);
				localStorage.setItem('loggedIn', 'standard');	/** imposta il tipo di account nello storage */
				localStorage.setItem('userIn', id);
				this.router.navigate(['']).then(() => {		/** naviga alla home */
					window.location.reload();
					this.openSnackBar('standard');	/** chiamata a snackbar */
				});
				return true;
			}
		}
		return false;
	}

	/** Set Log out account Standard */
	public setFalse() {
		this.isAuthenticated = 'false';
		console.log(this.isAuthenticated);
		localStorage.setItem('loggedIn', 'false');
		localStorage.removeItem('userIn');
		return this.isAuthenticated;
	}
/* #endregion */


/** Get per controllo stato Login */
	get controlLog() {
		return localStorage.getItem('loggedIn') || this.isAuthenticated;
	}


/* #region --------------- ACCOUNT GOOGLE --------------- */

	/** Servizio Login con Google */
	public signIn() {
		this.auth2.signIn().then((user) => {
			this.subject.next(user);
			this.isAuthenticated = 'google';
			localStorage.setItem('loggedIn', 'google');	/** imposta il tipo di account nello storage */
			this.router.navigate(['']).then(() => {		/** naviga alla home */
				window.location.reload();
				this.openSnackBar('google');	/** chiamata a snackbar */
			});
		}).catch(() => {
			this.subject.next();
		});
	}

	/** Log out Google */
	public signOut() {
		this.auth2.signOut().then(() => {
			this.subject.next();
		}).then(() => {
			localStorage.setItem('loggedIn', 'false');
			this.isAuthenticated = false;
			return this.isAuthenticated;
		});
	}

	/** API GOOGLE */
	public observable(): Observable<gapi.auth2.GoogleUser> {
		return this.subject.asObservable();
	}

/* #endregion */

/* #region  --------------- ACCOUNT MICROSOFT --------------- */
	/** Login MICROSOFT */
	logInMicro() {
		this.msalService.loginPopup().subscribe((response: AuthenticationResult) => {
			this.msalService.instance.setActiveAccount(response.account);
			localStorage.setItem('loggedIn', 'microsoft');
			this.router.navigate(['']).then(() => {		/** naviga alla home */
				window.location.reload();
				this.openSnackBar('microsoft');	/** chiamata a snackbar */
			});
		});
	}

	/** Controlla se è stato fatto accesso con MICROSOFT */
	isLoggedMicro(): boolean {
		return this.msalService.instance.getActiveAccount() != null;
	}

	/** Log out MICROSOFT */
	logOutMicro() {
		this.msalService.logout();
		localStorage.setItem('loggedIn', 'false');
	}

/* #endregion */

/** Snackbar */
	openSnackBar(/** string passata da funzioni per selezionare evento */check: string) {
		let config = new MatSnackBarConfig();
		config.panelClass = 'simple-snack-bar';
		if (check == 'google') {
			this.snackBar.open('Login eseguito con successo con Google', '', {
				panelClass: 'success',
				horizontalPosition: 'center',
				duration: 5000,
			});
		} else if (check == 'standard') {
			this.snackBar.open('Login eseguito con successo', '', {
				panelClass: 'success',
				horizontalPosition: 'center',
				duration: 5000,
			});
		} else if (check == 'microsoft') {
			this.snackBar.open('Login eseguito con successo con Microsoft', '', {
				panelClass: 'success',
				horizontalPosition: 'center',
				duration: 5000,
			});
		}
	}
}
