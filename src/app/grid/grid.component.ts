import { Component, OnInit } from '@angular/core';
import { MyService } from '../my.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  breakpoint!: number;
  DATA_ELEMENT!: Array<any>;

  constructor(private myservice:MyService) { }

  ngOnInit(): void {
    if(window.innerWidth <= 500){
      this.breakpoint = 1;
    }else if(window.innerWidth <= 1025){
      this.breakpoint =  2;
    }else{
      this.breakpoint =  3;
    }
    this.getDati();
  }
  onResize(event:any) {
    if(event.target.innerWidth <= 500){
      this.breakpoint = 1;
    }else if(event.target.innerWidth <= 1025){
      this.breakpoint = 2;
    }else{
      this.breakpoint = 3;
    }
  }

  async getDati(): Promise<void> {
    this.DATA_ELEMENT = await this.myservice.getDati()
    console.log(this.DATA_ELEMENT)
  }

}
