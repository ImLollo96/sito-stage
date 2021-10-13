import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StandardGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(){
    let role = localStorage.getItem('loggedIn')

    if(role == 'standard'){
      return true
    }else{
        this.router.navigate(['home']);
        alert('Non puoi accedere');
        return false;
    }
  }
  
}
