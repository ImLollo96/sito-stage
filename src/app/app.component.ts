import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './shared/auth.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Site';
  accedi= 'ACCEDI';
  user!: gapi.auth2.GoogleUser;
  control: any = null;
  isVisible:boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
  	map((result) => result.matches),
  	shareReplay()
  );


  constructor(private breakpointObserver: BreakpointObserver, private auth: AuthService) {
  	this.setOn();
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
}
