import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl = 'http://localhost:8000/api';


  constructor(private http: HttpClient) { }

  login(user: User ){
    return this.http.post(`${this.apiUrl}/login`,user);
  }
  register(user: User ){
    return this.http.post(`${this.apiUrl}/register`,user);
  }
}
