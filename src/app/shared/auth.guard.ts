import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {
	}

	canActivate() {
		if (this.auth.controlLog == true) {
			return true;
		} else {
			this.router.navigate(['login']);
			alert('Non puoi accedere');
			return false;
		}
	}
}
