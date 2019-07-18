import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = '';

  constructor(
    private http: HttpClient) { }

  postAPIData() {
    return this.http.post('http://localhost:3000/postData', { 'firstName': 'Code', 'lastName': 'Handbook' })
  }
}
