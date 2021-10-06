import { Component, OnInit } from '@angular/core';
import { MyService } from '../my.service';
import { AppComponent } from '../app.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  meteoData:any;
  ELEMENT_DATA!: Array<any>;

  theme:any;

  constructor(private myservice:MyService, private aComp: AppComponent) {
  	this.meteoData = this.ELEMENT_DATA;
    
  }

  ngOnInit(): void {
  	this.returnMeteo();
    this.theme = localStorage.getItem('Theme');
    console.log(this.theme);
  } 

  async returnMeteo(): Promise<void> {
  	this.ELEMENT_DATA = await this.myservice.returnMeteo();
  	console.log(this.ELEMENT_DATA);
  	this.meteoData = this.ELEMENT_DATA;
  }


}
