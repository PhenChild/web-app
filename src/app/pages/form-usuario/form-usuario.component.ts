import { Component, OnInit } from "@angular/core";
import { Estacion } from "../../modelos/estacion";
import { ViewEncapsulation } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Usuario } from "src/app/modelos/usuario";
import { NgForm } from "@angular/forms";
import { DbService } from "../../services/database/db.service";

@Component({
    selector: "app-form-usuario",
    templateUrl: "./form-usuario.component.html",
    styleUrls: ["./form-usuario.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class FormUsuarioComponent implements OnInit {
    estaciones: Estacion[] = [];
    selectedEstacion = new Estacion();
    usuario = new Usuario();

    closeResult: string;
    constructor(
        private dbService: DbService,
        private tService: ToastrService
    ) { }

    ngOnInit(): void {}

    onSubmit(formUsuario: NgForm) {
        this.dbService.addUsuario(this.usuario)
            .subscribe(
                data => {
                    this.tService.success("Usuario registrado con exito.", "Envio exitoso");
                    formUsuario.reset();
                },
                err => {
                    console.log(err);
                    this.tService.error("", "Ha ocurrido un error");
                    formUsuario.reset();
                }
            );
    }
}
