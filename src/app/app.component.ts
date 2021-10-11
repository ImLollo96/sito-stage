import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './shared/auth.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'My Site';
  accedi= 'ACCEDI';
  user!: gapi.auth2.GoogleUser;
  isVisible: boolean = false;
  color: any;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
  	map((result) => result.matches),
  	shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private translateS: TranslateService) {
  	this.setOn();
    this.setDefaultTheme();
    this.translateS.setDefaultLang('it');
    this.translateS.use(localStorage.getItem('lang') || 'it');
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


  //THEME CHANGE NORMAL
  themeColor:any = 'lightMode-normal';

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
    (this.themeColor == 'lightMode-normal')?this.themeColor = 'darkMode-normal':this.themeColor = 'lightMode-normal';
    body.classList.add(this.themeColor);
    localStorage.setItem('Theme',this.themeColor);
  }

  // get controlTheme(){
  //   return this.themeColor;
  // }


  //THEME CHANGE SPECIAL

  setColor(color) {
    console.log(color)
    document.documentElement.style.setProperty('--mat-primary-500', color);
    // calcolo chiaro, scuro, e contrast
  }

  setTheme(theme){
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.themeColor);
    localStorage.setItem('Theme',theme);
    this.themeColor = localStorage.getItem('Theme');
    body.classList.add(this.themeColor);
  }

  //TRANSLATE

  lang;

  ngOnInit(): void {
  	this.lang = localStorage.getItem('lang') || 'it';
  } 

  selectLanguage(lang){
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

}
