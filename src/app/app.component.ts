import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './shared/auth.service';
import { TranslateService } from '@ngx-translate/core'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'My Site';
  user!: gapi.auth2.GoogleUser;
  isVisible: boolean = false;
  color:any;
  colorSet: any;
  theme:any;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
  	map((result) => result.matches),
  	shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService, private translateS: TranslateService, private snackBar: MatSnackBar) {
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
  	if (this.auth.controlLog !== 'false') {
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
    }else{
      localStorage.setItem('Type',this.themeColor);
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
    localStorage.setItem('holdC',color);
    document.documentElement.style.setProperty('--mat-primary-500', color);
    this.setTheme('picker');
    window.location.reload();
  }

  //Converti in RGB
  parseColor(hex) {
    let r = 0, g = 0, b = 0;
    const match = hex.match(/^#([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/);
    if (match) {
        r = parseInt(match[1], 16);
        g = parseInt(match[2], 16);
        b = parseInt(match[3], 16);
    } else {
        const sMatch = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/);
        if (sMatch) {
            r = parseInt(`${sMatch[1]}${sMatch[1]}`, 16);
            g = parseInt(`${sMatch[2]}${sMatch[2]}`, 16);
            b = parseInt(`${sMatch[3]}${sMatch[3]}`, 16);
        }
    }
    return { r, g, b };
  }

  //CALCOLO LUMINOSITà
  isBright(color) {
    const { r, g, b } = this.parseColor(color);
    const luminance = (r * 0.299 + g * 0.587 + b * 0.114);
    return luminance > 90;
  }

//Scuro
  shade(color, factor = 0.75) {
    const { r, g, b } = this.parseColor(color);
    const nextColor = [
        Math.round(r * factor),
        Math.round(g * factor),
        Math.round(b * factor)
    ];
    return `#${nextColor.map((c = 0) => (c.toString(16).padStart(2, '0'))).join('')}`
  }

//Chiaro
  tint(color, factor = 0.25) {
    const { r, g, b } = this.parseColor(color);
    const nextColor = [
        Math.min(Math.round(r + (factor * (255 - r)))),
        Math.min(Math.round(g + (factor * (255 - g)))),
        Math.min(Math.round(b + (factor * (255 - b)))),
    ];
    return `#${nextColor.map((c = 0) => (c.toString(16).padStart(2, '0'))).join('')}`
  }

  
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
    }else{
      this.colorSet = '#ffffff';
      document.documentElement.style.setProperty('--mat-primary-500', this.colorSet);
      localStorage.setItem('Theme',theme);
    }

    let darker = this.shade(this.colorSet);
    let brighter = this.tint(this.colorSet);
    console.log('darker: ',darker,'brighter: ',brighter);
    document.documentElement.style.setProperty('--mat-primary-100', brighter);
    document.documentElement.style.setProperty('--mat-primary-700', darker);

    let check = this.isBright(this.colorSet);
    if(check === true){
      document.documentElement.style.setProperty('--mat-contrast-500', '#000000');
    }else{
      document.documentElement.style.setProperty('--mat-contrast-500', '#ffffff');
    }
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

  //SNACKBAR
  openSnackBar(){
    this.snackBar.openFromComponent(LogoutSnackBarComponent, {
      panelClass: 'success',
      horizontalPosition: 'center',
      duration:2000,
    });
  }

}

 
@Component({
  selector: 'logout-snackbar',
  template: `<span>Logout eseguito con successo</span>`
})
export class LogoutSnackBarComponent{}
