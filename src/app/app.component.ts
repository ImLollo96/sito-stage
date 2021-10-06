import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './shared/auth.service';
import { MyService } from './my.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Site';
  accedi= 'ACCEDI';
  user!: gapi.auth2.GoogleUser;
  isVisible:boolean = false;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
  	map((result) => result.matches),
  	shareReplay()
  );


  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private myService: MyService) {
  	this.setOn();
    this.setDefaultTheme();
  }

  setOff() {
  	this.auth.setFalse();
  	this.auth.signOut();
  	this.isVisible = false;
  	console.log('SET OFF isVisible =', this.isVisible);
  }

  setOn() {
  	if (this.auth.controlLog == true) {
  		this.isVisible = true;
  	}
  }


  //THEME CHANGE
  themeColor:any = 'lightMode';

  setDefaultTheme(){

    if(localStorage.getItem('Theme')){
      this.themeColor = localStorage.getItem('Theme');
      const body = document.getElementsByTagName('body')[0];
      body.classList.add(this.themeColor);
    }
  }

  themeSwitcher(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.themeColor);
    (this.themeColor == 'lightMode')?this.themeColor = 'darkMode':this.themeColor = 'lightMode';
    body.classList.add(this.themeColor);
    localStorage.setItem('Theme',this.themeColor);
  }

  get controlTheme(){
    return this.themeColor;
  }

}
