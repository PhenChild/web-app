import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dbURL = 'http://2dfb11b85f62.ngrok.io'
  constructor(private http: HttpClient) { }

  login(usuario){
    return this.http.post(this.dbURL + '/login', usuario)
  }

  logout(token){
    return this.http.post(this.dbURL + '/logout', token)
  }

  loggedIn(){
    return !!sessionStorage.getItem('token');
  }

}
