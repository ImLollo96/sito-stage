import { Component, OnInit} from '@angular/core';
import { MyService } from '../my.service';
import { User } from '../user';
import { MatTableDataSource } from '@angular/material/table';


  
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'phoneNumber' , 'emailAddress'];
  ELEMENT_DATA!: User[];
  dataSource: any;

  constructor(private myservice:MyService) { 
    this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  }

  ngOnInit(): void {
    this.getInformation();
  }
 
 async getInformation(): Promise<void> {
    this.ELEMENT_DATA = await this.myservice.getInformation()
    console.log(this.ELEMENT_DATA)
    this.dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);
  }
  
}
