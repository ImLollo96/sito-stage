import { Component, OnInit } from '@angular/core';
import { MyService } from '../my.service';
import { AppComponent } from '../app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  meteoData:any;
  ELEMENT_DATA!: Array<any>;
  theme:any;

  constructor(private myservice:MyService, private aComp: AppComponent,private translateS: TranslateService) {
  	this.meteoData = this.ELEMENT_DATA;
    
  }

  ngOnInit(): void {
  	this.returnMeteo();
  } 

/** Chiamata a servizio per widget Meteo */
  async returnMeteo(): Promise<void> {
  	this.ELEMENT_DATA = await this.myservice.returnMeteo();
  	this.meteoData = this.ELEMENT_DATA;
  }


}
