import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // serverPort = 'https://shopping-nodejs.herokuapp.com';
  serverPort = 'http://localhost:3000';

  constructor(
    private http: HttpClient,

  ) { }

  getAllData(id: string): Observable<any> {
    return this.http.get(`${this.serverPort}/${id}`)
      .pipe(
        map(res => {
          return res;
        }),catchError(this.handleError)
 
      )
  }

  handleError(error) {
    let errorMessage = '';
    if (error instanceof HttpResponse) {
    } 
    return errorMessage;
  }

  saveData(regObject, id: string): Observable<any> {
    return this.http.post(`${this.serverPort}/saveData/${id}`, regObject)
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  find(regObject, id: string): Observable<any> {
    return this.http.post(`${this.serverPort}/find/${id}`, regObject)
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  updateData(id: string, _id: string, uPassword: object): Observable<any> {
    return this.http.put(`${this.serverPort}/updateData/${id}`, { _id: _id, password: uPassword })
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${this.serverPort}/findById/${id}`)
      .pipe(
        map(res => {
          return res;
        })
      )
  }


}
