import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import datiAutenticazione from './password.json';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
 
@Injectable({
	providedIn: 'root'
})
export class AuthService {
  private auth2!: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  DATA_ELEMENT: Array<any> = datiAutenticazione;
  //isAuthenticated:boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  isAuthenticated:any = localStorage.getItem('loggedIn') || 'false';


  constructor(private router: Router, private snackBar: MatSnackBar) {
  	gapi.load('auth2', () => {
  		this.auth2 = gapi.auth2.init({
  			client_id: '111898526119-bip3c2ncalj0hfe5s3k4cop1dde36tok.apps.googleusercontent.com'
  		});
  	});
  }

  // LOGIN / LOGOUT CREDENZIALI LOCALI
  public isLogged(u:string, p:string) {
  	if (this.DATA_ELEMENT.find((x) => x.user == u)) {
  		if (this.DATA_ELEMENT.find((x) => x.pass == p)) {
  			this.isAuthenticated = 'false';
  			console.log(this.isAuthenticated);
  			localStorage.setItem('loggedIn', 'standard');
  			this.router.navigate(['']).then(() => {
  				window.location.reload();
				this.openSnackBar('normal');
  			});
  			return true;
  		}
  	}
  	return false;
  }

  public setFalse() {
  	this.isAuthenticated = 'false';
  	console.log(this.isAuthenticated);
  	localStorage.setItem('loggedIn', 'false');
  	return this.isAuthenticated;
  }


	get controlLog() {
		return localStorage.getItem('loggedIn') || this.isAuthenticated;
	}

  // LOGIN / LOGOUT GOOGLE
  public signIn() {
  	this.auth2.signIn().then((user) => {
  		this.subject.next(user);
  		this.isAuthenticated = true;
  		localStorage.setItem('loggedIn', 'google');
  		this.router.navigate(['']).then(() => {
  			window.location.reload();
			this.openSnackBar('google');
  		});
  	}).catch(() => {
  		this.subject.next();
  	});
  }

  public signOut() {
  	this.auth2.signOut().then(() => {
  		this.subject.next();
  	}).then(() => {
  		localStorage.setItem('loggedIn', 'false');
  		this.isAuthenticated = false;
  		return this.isAuthenticated;
  	});
  }

  public observable():Observable<gapi.auth2.GoogleUser> {
  	return this.subject.asObservable();
  }

  

  //SNACKBAR
  openSnackBar(check){
    let config = new MatSnackBarConfig();
	config.panelClass = 'simple-snack-bar';
	if(check=='google'){
		this.snackBar.open('Login eseguito con successo con Google', '', {
			panelClass: 'success',
    		horizontalPosition: 'center',
			duration:5000,
		});
	}else if(check=='normal'){
		this.snackBar.open('Login eseguito con successo', '', {
			panelClass: 'success',
    		horizontalPosition: 'center',
			duration:5000,
		});
	}
  }
}
