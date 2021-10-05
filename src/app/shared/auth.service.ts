import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import datiAutenticazione from './password.json';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
  private auth2!: gapi.auth2.GoogleAuth;
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  DATA_ELEMENT: Array<any> = datiAutenticazione;
  isAuthenticated:boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false');


  constructor(private router: Router) {
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
  			this.isAuthenticated = true;
  			console.log(this.isAuthenticated);
  			localStorage.setItem('loggedIn', 'true');
  			this.router.navigate(['']).then(() => {
  				window.location.reload();
  			});
  			return true;
  		}
  	}
  	return false;
  }

  public setFalse() {
  	this.isAuthenticated = false;
  	console.log(this.isAuthenticated);
  	localStorage.setItem('loggedIn', 'false');
  	return this.isAuthenticated;
  }

  // GET PER "canActivate"
  get controlLog() {
  	return JSON.parse(localStorage.getItem('loggedIn') || this.isAuthenticated.toString());
  }

  // LOGIN / LOGOUT GOOGLE
  public signIn() {
  	this.auth2.signIn().then((user) => {
  		this.subject.next(user);
  		this.isAuthenticated = true;
  		localStorage.setItem('loggedIn', 'true');
  		this.router.navigate(['']).then(() => {
  			window.location.reload();
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
}
