import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token: any;
  serverPort = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
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

  updatePassword(uNumber: String, uPassword: String): Observable<any> {
    return this.http.put(`${this.serverPort}/updatePassword`, { number : uNumber, password : uPassword })
    .pipe(
      map(res => {
        return res;
      })
    )
  }


  login(email: String, password: String) {
    return this.http.post(`${this.serverPort}/login`,
      { email: email, password: password }
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
          .then(
            () => {
              console.log('Token Stored');
            },
            error => console.error('Error storing item', error)
          );
        this.token = token;
        console.log(this.token, 'token')
        this.isLoggedIn = true;
        return token;
      }),
    );
  }



  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"] + " " + this.token["access_token"]
    });

    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
      .pipe(
        tap(data => {
          this.storage.remove("token");
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      )
  }

  // user() {
  //   const headers = new HttpHeaders({
  //     'Authorization': this.token["token_type"] + " " + this.token["access_token"]
  //   });

  //   return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
  //     .pipe(
  //       tap(user => {
  //         return user;
  //       })
  //     )
  // }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;

        if (this.token != null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn = false;
      }
    );
  }
}
