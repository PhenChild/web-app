import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm} from "@angular/forms";
import { AuthService} from "../../services/auth/auth.service";
import { ToastrService } from "ngx-toastr";
import { AccessToken } from "../../modelos/accessToken";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, OnDestroy {
    usuario = {
        email: "",
        password: "",
    };

    token: AccessToken;
    constructor(
        private authService: AuthService,
        private router: Router,
        private tService: ToastrService
    ) {}

    ngOnInit(): void {
    }
    ngOnDestroy(): void {
    }

    onSubmit(formLogin: NgForm): void {
        this.authService.login(this.usuario)
            .subscribe(
                data => {
                    this.token = (data as any);
                    sessionStorage.setItem("token", this.token.accessToken);
                    sessionStorage.setItem("user", this.token.email);
                    this.router.navigate(["/admin-layout/usuarios"]);
                },
                err => {
                    console.log(err);
                    this.tService.error("Usuario o Contraseña Incorrecta.", "Error en inicio de sesion");
                }
            );
    }
}
