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
<<<<<<< HEAD
  color:any;
  colorSet: any;
  theme:any;
=======
  color: any;
>>>>>>> 9b6fd652713fbf013978c7b5cb56ebe471db0893
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
  	map((result) => result.matches),
  	shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private translateS: TranslateService) {
  	this.setOn();
    this.setDefaultTheme();
    this.setTheme(localStorage.getItem('Theme') || 'blue');
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

    if(localStorage.getItem('Type')){
      this.themeColor = localStorage.getItem('Type');
      const body = document.getElementsByTagName('body')[0];
      body.classList.add(this.themeColor);
    }
  }

  themeSwitcher(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.themeColor);
    (this.themeColor == 'lightMode-normal')?this.themeColor = 'darkMode-normal':this.themeColor = 'lightMode-normal';
    body.classList.add(this.themeColor);
    localStorage.setItem('Type',this.themeColor);
  }


  //THEME CHANGE SPECIAL

  setColor(color) {
<<<<<<< HEAD
    localStorage.setItem('holdC',color);
    document.documentElement.style.setProperty('--mat-primary-500', color);
    this.setTheme('picker');
    window.location.reload();
    // calcolo chiaro, scuro, e contrast
  }

  
=======
    console.log(color)
    document.documentElement.style.setProperty('--mat-primary-500', color);
    // calcolo chiaro, scuro, e contrast
  }

>>>>>>> 9b6fd652713fbf013978c7b5cb56ebe471db0893
  setTheme(theme){
    if(theme=='blue'){
      this.colorSet='#1700e9'
      document.documentElement.style.setProperty('--mat-primary-500', this.colorSet);
      localStorage.setItem('Theme',theme);
    }else if(theme=='brown'){
      this.colorSet='#5b2c2c'
      document.documentElement.style.setProperty('--mat-primary-500', this.colorSet);
      localStorage.setItem('Theme',theme);
    }else if(theme=='purple'){
      this.colorSet='#673AB7'
      document.documentElement.style.setProperty('--mat-primary-500', this.colorSet);
      localStorage.setItem('Theme',theme);
    }else if(theme=='green'){
      this.colorSet='#38b947'
      document.documentElement.style.setProperty('--mat-primary-500', this.colorSet);
      localStorage.setItem('Theme',theme);
    }else if(theme=='picker'){
      this.colorSet=localStorage.getItem('holdC');
      document.documentElement.style.setProperty('--mat-primary-500', this.colorSet);
      localStorage.setItem('Theme',theme);
    }

    let check = this.isBright(this.colorSet);
    if(check === true){
      document.documentElement.style.setProperty('--mat-contrast-500', '#000000');
    }else{
      document.documentElement.style.setProperty('--mat-contrast-500', '#ffffff');
    }
  }

  //CALCOLO LUMINOSITà
  isBright(rgb) {
    let r = 0, g = 0, b = 0;

    const match = rgb.match(/^#([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/);
    if (match) {
        r = parseInt(match[1], 16);
        g = parseInt(match[2], 16);
        b = parseInt(match[3], 16);
    } else {
        const sMatch = rgb.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/);
        if (sMatch) {
            r = parseInt(`${sMatch[1]}${sMatch[1]}`, 16);
            g = parseInt(`${sMatch[2]}${sMatch[2]}`, 16);
            b = parseInt(`${sMatch[3]}${sMatch[3]}`, 16);
        }
    }
    const luminance = (r*0.299 + g*0.587 + b*0.114);
    console.log({ rgb, r, g, b, luminance });
    return luminance > 90;
  }


  ngOnInit(): void {
  	this.lang = localStorage.getItem('lang') || 'it';
    this.theme = localStorage.getItem('Theme') || 'blue';
  } 

  //TRANSLATE

  lang;

  selectLanguage(lang){
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

}



// setTheme(theme){
  // const body = document.getElementsByTagName('body')[0];
    // body.classList.remove(this.themeColor);
    // localStorage.setItem('Theme',theme);
    // this.themeColor = localStorage.getItem('Theme');
    // body.classList.add(this.themeColor);
// }
