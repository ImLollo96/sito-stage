import { Injectable } from '@angular/core';
import { User } from './user';
import  list from './data-for-table.json';
import  dati from './grid-data.json';
import datiAutenticazione from 'C:/Users/Lorenzo/Documents/ANGULAR/progetto1/src/app/password.json';


@Injectable({
  providedIn: 'root'
})
export class MyService {


  constructor() { 
    console.log('Chiamato');
  }

  public getInformation(): Promise<User []> {
     return new Promise((resolve) => setTimeout(resolve, 500, list));
  }
  public getDati(): Promise<Array<any>> {
    return new Promise((resolve) => setTimeout(resolve, 500, dati));  
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
