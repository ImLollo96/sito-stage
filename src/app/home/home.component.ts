import { Component, OnInit } from '@angular/core';
import { MyService } from '../my.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  meteoData:any;
  ELEMENT_DATA!: Array<any>;

  constructor(private myservice:MyService) {
  	this.meteoData = this.ELEMENT_DATA;
  }

  ngOnInit(): void {
  	this.returnMeteo();
  }

  async returnMeteo(): Promise<void> {
  	this.ELEMENT_DATA = await this.myservice.returnMeteo();
  	console.log(this.ELEMENT_DATA);
  	this.meteoData = this.ELEMENT_DATA;
  }
}
