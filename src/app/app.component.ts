import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'My Site';
  accedi= 'ACCEDI';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  isVisible= false;
  siVede=true;

  constructor(private breakpointObserver: BreakpointObserver, private authG: AuthGuard, private auth: AuthService, private authS: SocialAuthService) {}

  setOff(){
    this.auth.setFalse();
    this.authS.signOut();
    this.isVisible=false;
    this.siVede=true;
  }

  setOn(){
    this.isVisible=true;
    this.siVede=false;
  }

}
