import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Site';
  user!: gapi.auth2.GoogleUser;
  isVisible: boolean = false; /** UI on/off */
  isVisibleStaff: boolean = false;   /** bottone "staff" on/off */
  color!: string; /** gestisce il colore da mostare nel picker come selezionato */
  colorSet: any;
  theme!: string; /** gestisce che tema mostare come selezionato */
  themeColor: any = 'lightMode-normal'; 
  lang!: string; /** gestisce che lingua mostrare come selezionata */

  /** Gestione apertura Menu sidenav */
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

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') || 'it';
    this.theme = localStorage.getItem('Theme') || 'blue';
  }

/* #region--- GESTIONE INTERFACCIA ---*/

  /** Rende invisibili parti dell'interfiaccia
   *  e richiama metodi per eseguire il Log Out
  */
  setOff() {
    if(this.auth.controlLog == 'microsoft'){
      this.auth.logOutMicro();  /** lougout account Microsoft */
    }
    this.auth.setFalse(); /** lougout account "standard" */
    this.auth.signOut();  /** lougout account Google */
    this.isVisible = false; /** disabilita/rende invisibile gli elementi dell'interfiaccia */
    this.isVisibleStaff = false;  /** disabilita/rende invisibile il bottone "staff" */
  }

  /** Rende visibili parti dell'interfaccia al Log In */
  setOn() {
    if (this.auth.controlLog !== 'false') {   /** controlla se effettivamente si è fatto il login */
      this.isVisible = true;
      if (this.auth.controlLog == 'standard') {  /** se non si è fatto l'accesso con Google abilita anche bottone "staff" */
        this.isVisibleStaff = true;
      }
    }
  }
/* #endregion */


/* #region--- GESTIONE TEMI ---*/

  /** Set del tema chiaro/scuro */
  setDefaultTheme() {
    if (localStorage.getItem('Type')) {
      this.themeColor = localStorage.getItem('Type');
      const body = document.getElementsByTagName('body')[0];
      body.classList.add(this.themeColor);  /** imposta tema body */
    } else {
      localStorage.setItem('Type', this.themeColor);
    }
  }

  /** Cambio del tema da chiaro/scuro */
  themeSwitcher() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove(this.themeColor);
    (this.themeColor == 'lightMode-normal') ? this.themeColor = 'darkMode-normal' : this.themeColor = 'lightMode-normal'; /** se il tema è chiaro lo mette scuro o viceversa */
    body.classList.add(this.themeColor);  /** imposta tema body */
    localStorage.setItem('Type', this.themeColor);  /** setta nello storage il tema in uso */
  }

  /** Set del primary color da "Color Picker" */
  setColor(/** hex del colore scelto da utente */color: string) {
    localStorage.setItem('holdC', color);
    document.documentElement.style.setProperty('--mat-primary-500', color);
    this.setTheme('picker');
    window.location.reload();
  }

  /** Converte da HEX a RGB il colore scelto dal "Color Picker"
   *  e dei colori dei temi preimpostati
  */
  parseColor(/** hex passato dalla funzione */hex: string) {
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

  /** Calcolo della luminosità */
  isBright(color: string) {
    const { r, g, b } = this.parseColor(color);
    const luminance = (r * 0.299 + g * 0.587 + b * 0.114);
    return luminance > 90;
  }

  /** Calcolo sfumatura SCURA del primary 500 */
  shade(color: string, factor = 0.75) {
    const { r, g, b } = this.parseColor(color);
    const nextColor = [
      Math.round(r * factor),
      Math.round(g * factor),
      Math.round(b * factor)
    ];
    return `#${nextColor.map((c = 0) => (c.toString(16).padStart(2, '0'))).join('')}`
  }

  /** Calcolo sfumatura CHIARA del primary 500 */
  tint(color: string, factor = 0.25) {
    const { r, g, b } = this.parseColor(color);
    const nextColor = [
      Math.min(Math.round(r + (factor * (255 - r)))),
      Math.min(Math.round(g + (factor * (255 - g)))),
      Math.min(Math.round(b + (factor * (255 - b)))),
    ];
    return `#${nextColor.map((c = 0) => (c.toString(16).padStart(2, '0'))).join('')}`
  }

  /** Set del color primary 500 con temi preimpostati
   * Scelti dall'utente da menu
  */
  setTheme(/** valore scelto nel mat-select */theme: string) {
    if (theme == 'blue') {
      this.colorSet = '#1700e9';
      document.documentElement.style.setProperty('--mat-primary-500', this.colorSet);   /** setta il tema */
      localStorage.removeItem('holdC'); /** rimuove eventuale colore scelto da "Color Picker" nello storage */
      localStorage.setItem('Theme', theme);/** setta nello storage il tema attuale */
    } else if (theme == 'brown') {
      this.colorSet = '#5b2c2c';
      document.documentElement.style.setProperty('--mat-primary-500', this.colorSet);
      localStorage.removeItem('holdC');
      localStorage.setItem('Theme', theme);
    } else if (theme == 'purple') {
      this.colorSet = '#673AB7';
      document.documentElement.style.setProperty('--mat-primary-500', this.colorSet);
      localStorage.removeItem('holdC');
      localStorage.setItem('Theme', theme);
    } else if (theme == 'green') {
      this.colorSet = '#38b947';
      document.documentElement.style.setProperty('--mat-primary-500', this.colorSet);
      localStorage.removeItem('holdC');
      localStorage.setItem('Theme', theme);
    } else if (theme == 'picker') {
      this.colorSet = localStorage.getItem('holdC');
      document.documentElement.style.setProperty('--mat-primary-500', this.colorSet);
      localStorage.setItem('Theme', theme);
    } else {
      this.colorSet = '#ffffff';
      document.documentElement.style.setProperty('--mat-primary-500', this.colorSet);
      localStorage.setItem('Theme', theme);
    }

    let darker = this.shade(this.colorSet);
    let brighter = this.tint(this.colorSet);
    //console.log('darker: ',darker,'brighter: ',brighter);
    document.documentElement.style.setProperty('--mat-primary-100', brighter);  /** setta la variante più chiara del tema */
    document.documentElement.style.setProperty('--mat-primary-700', darker);  /** setta la variante più scura del tema */

    let check = this.isBright(this.colorSet);   /** risultato controllo livello di luminosità */
    if (check === true) {   /** in base al risultato decide se presentare testo (ecc...) di colore nero e o bianco */
      document.documentElement.style.setProperty('--mat-contrast-500', '#000000');
    } else {
      document.documentElement.style.setProperty('--mat-contrast-500', '#ffffff');
    }
  }
/* #endregion */


  /** Set della lingua */
  selectLanguage(lang:string) {
    localStorage.setItem('lang', lang); /** setta nello storage la lingua attualmente usata */
    window.location.reload();
  }

  /** Snackbar */
  openSnackBar() {
    this.snackBar.openFromComponent(LogoutSnackBarComponent, {
      panelClass: 'success',
      horizontalPosition: 'center',
      duration: 2000,
    });
  }

}


/* #region---  Componente per la Snackbar ---*/
@Component({
  selector: 'logout-snackbar',
  template: `<span>Logout eseguito con successo</span>`
})
export class LogoutSnackBarComponent { }
/* #endregion */
