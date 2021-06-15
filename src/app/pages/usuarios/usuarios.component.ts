import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { Usuario } from "../../modelos/usuario";
import {ViewEncapsulation} from "@angular/core";
import {DbService} from "../../services/database/db.service";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";


@Component({
    selector: "app-usuarios",
    templateUrl: "./usuarios.component.html",
    styleUrls: ["./usuarios.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class UsuariosComponent implements OnInit, OnDestroy {

    dtOptions: DataTables.Settings = {};
    usuarios: Usuario[] = [];
    usuario = new Usuario();

    dtTrigger: Subject<any> = new Subject<any>();
    constructor( private dbService: DbService,
        private tService: ToastrService
    ) {}


    ngOnInit(): void {
        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 7
        };

        this.dbService.getUsuarios()
            .subscribe( data => {
                this.usuarios = data;
                this.dtTrigger.next();
            }, err => {
                console.log(err);
            });
    }

    ngOnDestroy(): void{
        this.dtTrigger.unsubscribe();
    }

    editarUsuario(usuario){
        this.usuario = usuario;
        this.usuario.password = "";
        const table = (<HTMLInputElement>document.getElementById("table"));
        const form = (<HTMLInputElement>document.getElementById("form-usuario"));
        table.style.display = "none";
        form.style.display = "block";
    }

    submit(formUsuario: NgForm) {
        this.dbService.updateUsuario(this.usuario)
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

    cancelar(formUser: NgForm){
        const table = (<HTMLInputElement>document.getElementById("table"));
        const form = (<HTMLInputElement>document.getElementById("form-usuario"));
        table.style.display = "block";
        form.style.display = "none";
        this.usuario = new Usuario();
        formUser.reset();
    }
}
