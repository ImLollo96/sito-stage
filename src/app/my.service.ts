import { Injectable ,Directive, Output, EventEmitter } from '@angular/core';
import { User } from './user';
import  list from './data-for-table.json';
import  dati from './grid-data.json';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ 
  providedIn: 'root'
})
export class MyService {

  constructor(private http: HttpClient) { 
    console.log('Chiamato');
  }

  //ritorna le info per la tabella
  getInformation(): Observable<any>{
    return this.http.get('/api/users');
  }

  //ritorna le info per grid
  getDati(): Observable<any>{
    return this.http.get('/api/grid');
  }

  
  log(arg0: string): void {
    throw new Error('Method not implemented.');
  }

  //METEO

  meteoData:any;

  returnMeteo(): Promise<any>{
    this.meteoData= fetch('https://api.openweathermap.org/data/2.5/weather?q=genoa&appid=e59773b90111c69daaa8f3243237690c').then(response=>response.json());
    return new Promise((resolve) => setTimeout(resolve, 500, this.meteoData));
  }

}





//PROMISE TO GET INFO BY JSON

// public getInformation(): Promise<User []> {
  //    return new Promise((resolve) => setTimeout(resolve, 500, list));
  // }

  // public getDati(): Promise<Array<any>> {
  //   return new Promise((resolve) => setTimeout(resolve, 500, dati));  
  // }
