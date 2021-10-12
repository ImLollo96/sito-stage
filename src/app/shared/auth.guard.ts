import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import datiAutenticazione from './password.json';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private auth: AuthService, private router: Router) {}

	DATA_ELEMENT: Array<any> = datiAutenticazione;

	canActivate(route:ActivatedRouteSnapshot) {
		let app = this.auth.controlLog.toString();
		console.log('Here' ,app);
		if (this.auth.controlLog == true) {
			return true;
		 }
		else if(app == 'normal'){
			//return this.auth.controlLog.roles.includes(route.data.role);
			return true;
		}
		else {
			this.router.navigate(['login']);
			alert('Non puoi accedere');
			return false;
		}
	}

	// canActivate(route:ActivatedRouteSnapshot) {
	// 	if (this.auth.controlLog == true) {
	// 		return true;
	// 	 }else {
	// 		this.router.navigate(['login']);
	// 		alert('Non puoi accedere');
	// 		return false;
	// 	}
	// }
}
