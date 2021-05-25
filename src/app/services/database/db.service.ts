import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  usuarios: Usuario[] = [];
  
  dbURL = 'http://052311f35372.ngrok.io'
  constructor(private http: HttpClient) { }

  getUsuarios(): any{
    return this.http.get(this.dbURL + '/getUsers')
  }

  getObservadores(): any{
    return this.http.get(this.dbURL + '/getObservadores')
  }

  getEstaciones(): any{
    return this.http.get(this.dbURL + '/getEstaciones')
  }

  getRegistros(): any{
    return this.http.get(this.dbURL + '/getRegistros')
  }

  getVariables(): any{
    return this.http.get(this.dbURL + '/getVariables')
  }

  addUsuario(usuario): any{
    this.http.post(this.dbURL + '/newUser',usuario)
  }

  addObservador(observador): any{
    this.http.post(this.dbURL +'/newObservador',observador)
  }

  addEstacion(estacion): any{
    this.http.post(this.dbURL + '/newEstacion',estacion)
  }

  addVariable(variable): any{
    this.http.post(this.dbURL + '/newVariables',variable)
  }



  
}
