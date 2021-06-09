import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    dbURL = "https://phenapp1.loca.lt/api";
    constructor(private http: HttpClient) { }

    login(usuario){
        return this.http.post(this.dbURL + "/auth/signinAdmin", usuario);
    }

    logout(token){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
    }

    loggedIn(){
        return !!sessionStorage.getItem("token");
    }

}
