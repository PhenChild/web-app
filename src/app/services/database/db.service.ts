import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../modelos/usuario';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  usuarios: Usuario[] = [];
  
  dbURL = 'https://phenapp1.loca.lt/api/'
  constructor(private http: HttpClient) { }

  getHeader(): any{
    return {
      'x-access-token':sessionStorage.getItem("token")
    }
  }

  getUsuarios(): any{
    return this.http.get(this.dbURL + 'users/getUsers',{headers:this.getHeader()})  
  }

  getObservadores(): any{
    return this.http.get(this.dbURL + 'observers/getObservadores')
  }

  getEstaciones(): any{
    return this.http.get(this.dbURL + 'getEstaciones')
  }

  getRegistros(): any{
    return this.http.get(this.dbURL + 'getRegistros')
  }

  getVariables(): any{
    return this.http.get(this.dbURL + 'getVariables',{headers:this.getHeader()})
  }

  addUsuario(usuario): any{
    console.log(usuario)
    return this.http.post(this.dbURL + 'auth/signup',usuario)
  }

  addObservador(observador): any{
    return this.http.post(this.dbURL +'newObservador',observador)
  }

  addEstacion(estacion): any{
    return this.http.post(this.dbURL + 'newEstacion',estacion)
  }

  addVariable(variable): any{
    return this.http.post(this.dbURL + 'newVariables',variable)
  }



  
}
