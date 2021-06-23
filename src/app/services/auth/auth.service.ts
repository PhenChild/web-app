import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

/**
 * root
 */
@Injectable({
    providedIn: "root"
})

/**
 * CLase para autenticacion
 */
export class AuthService {
    /** Url de conexión */
    dbURL = "https://phenapp2.loca.lt/api";

    /**
     * Constructor
     * @param http http
     */
    constructor(private http: HttpClient) { }

    /**
     * uduarios administrador
     * @param usuario administrador
     */
    login(usuario): any{
        return this.http.post(this.dbURL + "/auth/signinAdmin", usuario);
    }

    /**
     * token de autenticacion
     * @param token token de autenticacion con usuario envio
     */
    logout(): void{
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    }

    /**
     * token
     * @returns token verificacion
     */
    loggedIn(): boolean{
        return !!sessionStorage.getItem("token");
    }

}
