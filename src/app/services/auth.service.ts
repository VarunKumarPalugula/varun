import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
// import { NativeStorage } from '@ionic-native/native-storage';
import { EnvService } from './env.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token: any;
  serverPort = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    // private storage: NativeStorage,
    private env: EnvService,
    private router: Router,
    private toastController: ToastController
  ) { }

  register(uName: String, uEmail: String, uNumber: Number, uPassword: String): Observable<any> {
    return this.http.post(`${this.serverPort}/register`, { username: uName, email: uEmail, number: uNumber, password: uPassword })
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  checkUser(): Observable<any> {
    return this.http.get(`${this.serverPort}`)
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  updatePassword(id: string, uPassword: object): Observable<any> {
    console.log(id, uPassword)
    return this.http.put(`${this.serverPort}/updatePassword`, { _id: id, password: uPassword })
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  findById(id: string): Observable<any> {
    return this.http.get(`${this.serverPort}/getUser/${id}`)
      .pipe(
        map(res => {
          return res;
        })
      )
  }

  getToken() {
    // return this.storage.getItem('token').then(data => {
    //     this.token = data;

    //     if (this.token != null) {
    //       this.isLoggedIn = true;
    //     } else {
    //       this.isLoggedIn = false;
    //     }
    //   },
    //   error => {
    //     this.token = null;
    //     this.isLoggedIn = false;
    //   }
    // );

    let data = localStorage.getItem('_id')
    console.log(data)

    if (data !== 'null') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    let final = {
      'data' : data,
      'isLoggedIn' : this.isLoggedIn
    }
    return final;
  }
}
