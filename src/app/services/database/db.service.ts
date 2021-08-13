import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../../modelos/usuario";
import { Variable } from "../../modelos/variable";
import { environment } from "src/environments/environment";

/**
 * Root
 */
@Injectable({
    providedIn: "root"
})
export class DbService {

    /** Lista de usuarios */
    usuarios: Usuario[] = [];

    /** Url de conexión */
    // dbURL = "https://phenapp5.loca.lt/api/";
    dbURL = "http://" + environment.host + ":" + environment.apiport + "/api/";

    /**
     * Constructor
     * @param http
     */
    constructor(private http: HttpClient) { }

    /**
     * Cabezera
     * @returns
     */
    getHeader(): any{
        if ( sessionStorage.getItem("token") != null){
            return {
                "x-access-token": sessionStorage.getItem("token")
            };
        }else{
            return {};
        }
    }

    /**
     * Añadir los usuarios
     * @param usuario usuarios
     * @returns respuesta del servidor
     */
    addUsuario(usuario: Usuario): any{
        return this.http.post(this.dbURL + "auth/signup", usuario, {headers: this.getHeader()});
    }
    /* req.body.email, req.body.password, req.body.nombre, req.body.apellido, req.body.telefono*/

    /**
    * Obtención de usuarios
    * @returns respuesta del servidor
    */
    getUsuarios(): any{
        return this.http.get(this.dbURL + "users/getUsers", {headers: this.getHeader()});
    }

    /**
     * Eliminar usuarios
     * @param usuario usuarios que seran elimiandos
     * @returns respuesta del servidor
     */
    deleteUsuario(usuario: Usuario): any{
        return this.http.get(this.dbURL + "users/delete/" + usuario.id, {headers: this.getHeader()});
    }

    /**
     * Asignar roles
     * @param contenido
     * @returns respuesta del servidor
     */
    asignarRol(contenido): any{
        return this.http.post(this.dbURL + "users/updateRole", contenido, {headers: this.getHeader()});
    } // aqui solo se requiere req.body.usuario, req.body.role, req.body.estacion

    /**
     * Actualización de usuarios
     * @param usuario usuarios
     * @returns respuesta del servidor
     */
    updateUsuario(usuario): any{
        return this.http.post(this.dbURL + "updateUser", usuario, {headers: this.getHeader()});
    }// req.body.id, req.body.email, req.body.password, req.body.nombre, req.body.apellido, req.body.telefono

    // OBSERVERS ENDPOINTS

    /**
     * Obtener observadores de una estación
     * @param estacion estación
     * @returns respuesta del servidor
     */
    getObservadores(estacion): any{
        return this.http.get(this.dbURL + "observers/getObsByEst/" + estacion.codigo, {headers: this.getHeader()});
    }

    /**
     * Añadir observadores
     * @param observador observador
     * @returns respuesta del servidor
     */
    addObservador(observador): any{
        return this.http.post(this.dbURL + "observers/new", observador, {headers: this.getHeader()});
    }// aqui solo se requiere req.body.codigoestacion, req.body.userid,

    // ESTACIONES ENDPOINTS

    /**
     * Obtener Estaciones
     * @returns respuesta del servidor
     */
    getEstaciones(): any{
        return this.http.get(this.dbURL + "estaciones/getAll", {headers: this.getHeader()});
    }

    /**
     * Eliminar estaciones
     * @param estacion
     * @returns respuesta del servidor
     */
    deleteEstacion(estacion): any{
        return this.http.get(this.dbURL + "estaciones/delete/" + estacion.codigo, {headers: this.getHeader()});
    }

    /**
     * Añadir estaciones
     * @param estacion estacion
     * @returns respuesta del servidor
     */
    addEstacion(estacion): any{
        return this.http.post(this.dbURL + "estaciones/new", estacion, {headers: this.getHeader()});
    }// aqui req.body.codigoEstacion, req.body.nombreEstacion, req.body.latitud,
    // req.body.longitud,req.body.altitud,req.body.suelo,req.body.omm

    /**
     * Actualizar estaciones
     * @param estacion estacion
     * @returns respuesta del servidor
     */
    updateEstacion(estacion): any{
        return this.http.post(this.dbURL + "estaciones/updateEstacion", estacion, {headers: this.getHeader()});
    }// aqui req.body.codigo, req.body.nombreEstacion, req.body.latitud,
    // req.body.longitud,req.body.altitud,req.body.suelo,req.body.omm, req.body.jefeid

    // HORARIOS ENDPOINTS

    /**
     * Obtener horarios
     * @returns respuesta del servidor
     */
    getHorarios(): any{
        return this.http.get(this.dbURL + "horarios/getHorarios", {headers: this.getHeader()});
    }

    // VARIABLES ENDPOINTS

    /**
     * Obtener Variables
     * @returns respuesta del servidor
     */
    getVariables(): any{
        return this.http.get(this.dbURL + "variables/getVariables", {headers: this.getHeader()});
    }

    /**
     * Añadir Variables
     * @param variable variables
     * @returns respuesta del servidor
     */
    addVariable(variable: Variable): any{
        return this.http.post(this.dbURL + "variables/new", variable, {headers: this.getHeader()});
    }// req.body.nombre, req.body.unidad, req.body.max, req.body.min, req.body.tipoDato

    /**
     * Actualizar variables
     * @param variable variables
     * @returns respuesta del servidor
     */
    updateVariable(variable: Variable): any{
        return this.http.post(this.dbURL + "variables/updateVariable", variable, {headers: this.getHeader()});
    }// req.body.id, req.body.nombre, req.body.unidad, req.body.max, req.body.min, req.body.tipoDato

    /**
     * Eliminar varibales
     * @param variable variables
     * @returns respuesta del servidor
     */
    deleteVariable(variable: Variable): any{
        return this.http.get(this.dbURL + "variables/delete/" + variable.id, {headers: this.getHeader()});
    }

    // VARIABLES-ESTACION ENDPOINTS

    /**
     * Obtener variables por estacion
     * @param estacion estacion
     * @returns respuesta del servidor
     */
    getVariablesEstacion(estacion): any{
        return this.http.get(this.dbURL + "vars-estaciones/getVariablesPorEstacion/" + estacion.codigo, {headers: this.getHeader()});
    }

    /**
     * Asignar Variables por estacion
     * @param contenido contenido
     * @returns respuesta del servidor
     */
    asignarVariables(contenido){
        return this.http.post(this.dbURL + "vars-estaciones/assign", contenido, {headers: this.getHeader()});
    }// req.body.codigoEstacion, req.body.variables cada variable tiene id, idHora

    addHorario(horario){
        return this.http.post(this.dbURL + "horarios/newHorario", horario, {headers: this.getHeader()});
    }

    updateHorario(horario){
        return this.http.post(this.dbURL + "horarios/updateHorario", horario, {headers: this.getHeader()});
    }

    deleteHorario(horario){
        return this.http.post(this.dbURL + "horarios/disableHorario", horario, {headers: this.getHeader()});
    }

    getInstrumentos(): any{
        return this.http.get(this.dbURL + "instrumentos/getInstrumentos", {headers: this.getHeader()});
    }

    addInstrumento(instrumento){
        return this.http.post(this.dbURL + "instrumentos/newInstrumento", instrumento, {headers: this.getHeader()});
    }

    updateInstrumento(instrumento){
        return this.http.post(this.dbURL + "instrumentos/updateInstrumento", instrumento, {headers: this.getHeader()});
    }

    deleteInstrumento(instrumento){
        return this.http.post(this.dbURL + "instrumentos/disableInstrumento", instrumento, {headers: this.getHeader()});
    }

    getInstrumentosEstacion(estacion){
        return this.http.post(this.dbURL + "instrumentos/getInstrumentoPorEstacion", estacion, {headers: this.getHeader()});
    }

    // REGISTROS ENDPOINTS

    /**
     * Obtener registros
     * @returns respuesta del servidor
     */
    getRegistros(): any{
        return this.http.get(this.dbURL + "registry/getRegistrosEstacion");
    }

    registroDiagrama(filter): any{
        return this.http.post(this.dbURL + "registry/estVarHoraFilter", filter);
    }

    updateRegistro(registro){
        return this.http.post(this.dbURL + "registry/updateRegistry", registro, {headers: this.getHeader()});
    }

    getTiposInstrumentos(){
        return this.http.get(this.dbURL + "tipo/getAll", {headers: this.getHeader()});
    }

    addTipoInstrumento(instrumento){
        return this.http.post(this.dbURL + "tipo/newTipo", instrumento, {headers: this.getHeader()});
    }

    updateTipoInstrumento(instrumento){
        return this.http.post(this.dbURL + "tipo/updateTipo", instrumento, {headers: this.getHeader()});
    }

    deleteTipoInstrumento(instrumento){
        return this.http.post(this.dbURL + "tipo/disableTipo", instrumento, {headers: this.getHeader()});
    }
}
