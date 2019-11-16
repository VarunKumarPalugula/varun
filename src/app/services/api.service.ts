import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { CometChat } from "@cometchat-pro/chat"

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverPort = 'https://shopping-nodejs.herokuapp.com';
  // serverPort = 'http://localhost:3000';
  apiKey = '7b0cec35b26f69ec033a5d6857c36a28f7510205';
  appID = "108598af99b073b";
  region = "legacy";

  constructor(
    private http: HttpClient,

  ) { }

  getAllData(id: string): Observable<any> {
    return this.http.get(`${this.serverPort}/${id}`)
      .pipe(
        map(res => {
          return res;
        }), catchError(this.handleError)

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

  deleteUser(model: string, id: string): Observable<any> {
    return this.http.post(`${this.serverPort}/deleteUser/${model}`, { _id: id })
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  ccAddUser(id: string, name: string): Observable<any> {
    let ccData = `{\"uid\":\"${id}\", \"name\":\"${id}\"}`;
    return this.http.get(`${this.serverPort}/ccAddUser/${ccData}`)
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  ccInIt() {
    CometChat.init(this.appID).then(

      () => {
        console.log('Initialization completed successfully');

        // You can now call login function.
      },
      error => {
        console.log('Initialization failed with error:', error);
        // Check the reason for error and take apppropriate action.
      }

    );
  }

}
