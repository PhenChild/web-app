import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "src/app/modelos/usuario";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    dbURL = "https://phenapp2.loca.lt/api";
    // dbURL = "https://" + environment.host + ":" + environment.port + "/api/";

    constructor(private http: HttpClient) { }

    login(usuario: Usuario): any{
        return this.http.post(this.dbURL + "/auth/signinAdmin", usuario);
    }

    logout(): void{
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    }

    loggedIn(): any{
        return !!sessionStorage.getItem("token");
    }

}
