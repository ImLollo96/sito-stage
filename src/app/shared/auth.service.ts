import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import datiAutenticazione from './password.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private router: Router) { 
  }
  DATA_ELEMENT: Array<any> = datiAutenticazione;
  isAuthenticated:boolean = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  

  public isLogged(u:string, p:string){ 
    
    if(this.DATA_ELEMENT.find(x=>x.user == u).user == u){ 
      if(this.DATA_ELEMENT.find(x=>x.pass == p).pass == p){
        this.isAuthenticated =  true;
        console.log(this.isAuthenticated);
        this.router.navigate(['']);
        localStorage.setItem('loggedIn', 'true');
        return true;
      }
    }
    return false;
  }

  public isLoggedGoogle(){
    this.isAuthenticated =  true;
    localStorage.setItem('loggedIn', 'true');
    return true; 
  }

  public setFalse(){
    localStorage.setItem('loggedIn', 'false');
    return this.isAuthenticated;
  }

  get controlLog(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.isAuthenticated.toString());
  }
}






//DATA_ELEMENT: Observable<any> = this.http.get('/api/users');

// us:any;
  // pa:any;

  // public isLogged(u:string, p:string){
    
  //   this.DATA_ELEMENT.subscribe(response=>{
  //     this.us=response.user;
  //     this.pa=response.pa;
  //   });

  //   if(this.us.find(x=>x.user == u).user == u){ 
  //     if(this.pa.find(x=>x.pass == p).pass == p){
  //       this.isAuthenticated =  true;
  //       console.log(this.isAuthenticated);
  //       this.router.navigate(['']);
  //       localStorage.setItem('loggedIn', 'true');
  //       return true;
  //     }
  //   }
  //   return false;
  // }