import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dbURL = 'http://052311f35372.ngrok.io'
  constructor(private http: HttpClient) { }

  signIn(usuario){
    return this.http.post(this.dbURL + '/signin', usuario)
  }

  loggedIn(){
    //return !!localStorage.getItem('token');
    return true;
  }

  
}
