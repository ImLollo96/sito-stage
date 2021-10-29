import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class MyService {

	meteoData:any;
	url:any = "http://localhost:3001/";

	constructor(private http: HttpClient) {	}

/** API per Table */
	getInformation(): Observable<any> {
		return this.http.get('/api/users');
	}

/** API per Grid */
	getDati(): Observable<any> {
		return this.http.get('/api/grid');
	}

/** API per Login */
	getPass(): Observable<any> {
		return this.http.get('/api/password');
	}

	getMessage(){
		return this.http.get(this.url);
	}

/** API per Widget Meteo */
	returnMeteo(): Promise<any> {
		this.meteoData = fetch('https://api.openweathermap.org/data/2.5/weather?q=genoa&appid=e59773b90111c69daaa8f3243237690c').then((response) => response.json());
		return new Promise((resolve) => setTimeout(resolve, 500, this.meteoData));
	}
}


// PROMISE TO GET INFO BY JSON

// public getInformation(): Promise<User []> {
//    return new Promise((resolve) => setTimeout(resolve, 500, list));
// }

// public getDati(): Promise<Array<any>> {
//   return new Promise((resolve) => setTimeout(resolve, 500, dati));
// }
