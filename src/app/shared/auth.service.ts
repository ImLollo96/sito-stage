import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { MyService } from '../my.service';
 
@Injectable({
	providedIn: 'root'
})

export class AuthService {
	private auth2!: gapi.auth2.GoogleAuth;
	private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);
	DATA_ELEMENT: any;
	//isAuthenticated:boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false');
	isAuthenticated:any = localStorage.getItem('loggedIn') || 'false';


	constructor(private router: Router, private snackBar: MatSnackBar, private http: HttpClient, private myservice:MyService) {
		gapi.load('auth2', () => {
			this.auth2 = gapi.auth2.init({
				client_id: '111898526119-bip3c2ncalj0hfe5s3k4cop1dde36tok.apps.googleusercontent.com'
			});
		});
		this.subTo();
	}
  
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
	public isLogged(u:string, p:string) {
		if (this.DATA_ELEMENT.find((x) => x.user == u)) {
			if (this.DATA_ELEMENT.find((x) => x.pass == p)) {
				this.isAuthenticated = 'standard';
				let index = this.DATA_ELEMENT.find((x) => x.user == u);
				localStorage.setItem('userInfo', index);
				let id = index.id;
				console.log('Il mio id',id);
				localStorage.setItem('loggedIn', 'standard');
				localStorage.setItem('userIn', id);
				this.router.navigate(['']).then(() => {
					window.location.reload();
					this.openSnackBar('standard');
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
		localStorage.removeItem('userInfo');
		return this.isAuthenticated;
	}

/** Get per controllo stato Login */
	get controlLog() {
		return localStorage.getItem('loggedIn') || this.isAuthenticated;
	}

/** Servizio Login con Google */
	public signIn() {
		this.auth2.signIn().then((user) => {
			this.subject.next(user);
			this.isAuthenticated = 'google';
			localStorage.setItem('loggedIn', 'google');
			this.router.navigate(['']).then(() => {
				window.location.reload();
				this.openSnackBar('google');
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
	public observable():Observable<gapi.auth2.GoogleUser> {
		return this.subject.asObservable();
	}

  

/** Snackbar */
	openSnackBar(check){
		let config = new MatSnackBarConfig();
		config.panelClass = 'simple-snack-bar';
		if(check=='google'){
			this.snackBar.open('Login eseguito con successo con Google', '', {
				panelClass: 'success',
				horizontalPosition: 'center',
				duration:5000,
			});
		}else if(check=='standard'){
			this.snackBar.open('Login eseguito con successo', '', {
				panelClass: 'success',
				horizontalPosition: 'center',
				duration:5000,
			});
		}
	}
}
