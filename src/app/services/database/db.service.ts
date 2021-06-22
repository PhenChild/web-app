import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../../modelos/usuario";
import { param } from "jquery";
import { Estacion } from "src/app/modelos/estacion";
@Injectable({
    providedIn: "root"
})
export class DbService {
    usuarios: Usuario[] = [];

    dbURL = "https://phenapp2.loca.lt/api/";
    constructor(private http: HttpClient) { }

    getHeader(): any{
        return {
            "x-access-token": sessionStorage.getItem("token")
        };
    }

    /**
     * asdfasf
     * @param usuario asfasfasdf
     * @returns asdfasfasd
     */
    addUsuario(usuario): any{
        return this.http.post(this.dbURL + "auth/signup", usuario, {headers: this.getHeader()});
    }
    /* req.body.email, req.body.password, req.body.nombre, req.body.apellido, req.body.telefono*/
    getUsuarios(): any{
        return this.http.get(this.dbURL + "users/getUsers", {headers: this.getHeader()});
    }
    deleteUsuario(usuario){
        return this.http.get(this.dbURL + "users/delete/" + usuario.id, {headers: this.getHeader()});
    }
    asignarRol(contenido){
        return this.http.post(this.dbURL + "users/updateRole", contenido, {headers: this.getHeader()});
    } // aqui solo se requiere req.body.usuario, req.body.role, req.body.estacion
    updateUsuario(usuario): any{
        return this.http.post(this.dbURL + "updateUser", usuario, {headers: this.getHeader()});
    }// req.body.id, req.body.email, req.body.password, req.body.nombre, req.body.apellido, req.body.telefono

    // OBSERVERS ENDPOINTS
    getObservadores(estacion): any{
        return this.http.get(this.dbURL + "observers/getObsByEst/" + estacion.codigo, {headers: this.getHeader()});
    }
    addObservador(observador): any{
        return this.http.post(this.dbURL + "observers/new", observador, {headers: this.getHeader()});
    }// aqui solo se requiere req.body.codigoestacion, req.body.userid,

    // ESTACIONES ENDPOINTS
    getEstaciones(): any{
        return this.http.get(this.dbURL + "estaciones/getAll", {headers: this.getHeader()});
    }
    deleteEstacion(estacion){
        return this.http.get(this.dbURL + "estaciones/delete/" + estacion.codigo, {headers: this.getHeader()});
    }
    addEstacion(estacion): any{
        return this.http.post(this.dbURL + "estaciones/new", estacion, {headers: this.getHeader()});
    }// aqui req.body.codigoEstacion, req.body.nombreEstacion, req.body.latitud,
    // req.body.longitud,req.body.altitud,req.body.suelo,req.body.omm
    updateEstacion(estacion): any{
        return this.http.post(this.dbURL + "estaciones/updateEstacion", estacion, {headers: this.getHeader()});
    }// aqui req.body.codigo, req.body.nombreEstacion, req.body.latitud,
    // req.body.longitud,req.body.altitud,req.body.suelo,req.body.omm, req.body.jefeid

    // HORARIOS ENDPOINTS
    getHorarios(): any{
        return this.http.get(this.dbURL + "horarios/getHorarios", {headers: this.getHeader()});
    }

    // VARIABLES ENDPOINTS
    getVariables(): any{
        return this.http.get(this.dbURL + "variables/getVariables", {headers: this.getHeader()});
    }
    addVariable(variable): any{
        return this.http.post(this.dbURL + "variables/new", variable, {headers: this.getHeader()});
    }// req.body.nombre, req.body.unidad, req.body.max, req.body.min, req.body.tipoDato
    updateVariable(variable): any{
        return this.http.post(this.dbURL + "variables/updateVariable", variable, {headers: this.getHeader()});
    }// req.body.id, req.body.nombre, req.body.unidad, req.body.max, req.body.min, req.body.tipoDato
    deleteVariable(variable){
        return this.http.get(this.dbURL + "variables/delete/" + variable.id, {headers: this.getHeader()});
    }

    // VARIABLES-ESTACION ENDPOINTS
    getVariablesEstacion(estacion): any{
        console.log(estacion.codigo);
        return this.http.get(this.dbURL + "vars-estaciones/getVariablesPorEstacion/" + estacion.codigo, {headers: this.getHeader()});
    }
    asignarVariables(contenido){
        return this.http.post(this.dbURL + "vars-estaciones/assign", contenido, {headers: this.getHeader()});
    }// req.body.codigoEstacion, req.body.variables cada variable tiene id, idHora

    // REGISTROS ENDPOINTS
    getRegistros(): any{
        return this.http.get(this.dbURL + "registry/getRegistros", {headers: this.getHeader()});
    }
}
