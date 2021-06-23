import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import { Router } from "@angular/router";

/**
 * Injectable
 */
@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    /**
     * Constructor
     * @param authService 
     * @param router 
     */
    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    /**
     * Funcion para saber si puede ser activo
     * @returns 
     */
    canActivate(): boolean{
        if (this.authService.loggedIn()){
            return true;
        }
        this.router.navigate(["/auth-layout/login"]);
        return true;
    }

}
