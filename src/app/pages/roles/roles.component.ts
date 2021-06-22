import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../modelos/usuario";
import { DbService } from "../../services/database/db.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { Estacion } from "../../modelos/estacion";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";


@Component({
    selector: "app-roles",
    templateUrl: "./roles.component.html",
    styleUrls: ["./roles.component.css"]
})
export class RolesComponent implements OnInit {

    dtOptions: DataTables.Settings = {};
    usuarios: Usuario[] = [];
    estaciones: Estacion[] = [];
    selectedEstacion = new Estacion();
    selectedUser = new Usuario();

    closeResult: string;

    dtTrigger1: Subject<any> = new Subject();
    dtTrigger2: Subject<any> = new Subject();
    constructor(
        private dbService: DbService,
        private modalService: NgbModal,
        private tService: ToastrService
    ) { }

    ngOnInit(): void {
        const select = document.getElementById("rol");

        select.addEventListener("change", function () {
            const val = (<HTMLInputElement>document.getElementById("rol")).value;
            const checkbox = (<HTMLInputElement>document.getElementById("checkboxEsPrincipal"));
            const table = (<HTMLInputElement>document.getElementById("table-container"));
            const estacion = (<HTMLInputElement>document.getElementById("text-estacion"));
            if (val.localeCompare("observer") === 0) {
                table.style.display = "block";
                checkbox.style.display = "block";
            } else if (val.localeCompare("admin") === 0) {
                table.style.display = "none";
                checkbox.style.display = "none";
                estacion.style.display = "none";
            };
        });

        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 4
        };

        this.dbService.getUsuarios()
            .subscribe(data => {
                this.usuarios = data;
                this.dtTrigger1.next();
            });
        this.dbService.getEstaciones()
            .subscribe(data => {
                this.estaciones = (data as any);
                this.dtTrigger2.next();
            });
    }

    ngOnDestroy(): void {
        this.dtTrigger1.unsubscribe();
        this.dtTrigger2.unsubscribe();
    }

    selectUsuario(usuario) {
        const table = (<HTMLInputElement>document.getElementById("usuarios-table"));
        table.style.display = "none";
        this.selectedUser = usuario;
        const form = (<HTMLInputElement>document.getElementById("rol-form"));
        form.style.display = "";
        // this.usuario.idEstacion = this.selectedEstacion.id;
        // this.usuario.isJefe = 1;
    }

    unselectUsuario() {
        this.selectedUser = new Usuario();
        const form = (<HTMLInputElement>document.getElementById("rol-form"));
        form.style.display = "none";
        const table = (<HTMLInputElement>document.getElementById("usuarios-table"));
        table.style.display = "";
    }

    selectEstacion(estacion) {
        const table = (<HTMLInputElement>document.getElementById("table-container"));
        table.style.display = "none";
        this.selectedEstacion = estacion;
        const input = (<HTMLInputElement>document.getElementById("text-estacion"));
        input.style.display = "block";
    }

    unselectEstacion() {
        this.selectedEstacion = new Estacion();
        const table = (<HTMLInputElement>document.getElementById("table-container"));
        table.style.display = "block";
        const input = (<HTMLInputElement>document.getElementById("text-estacion"));
        input.style.display = "none";
    }

    onSubmit(formRol: NgForm) {
        const rol = (<HTMLInputElement>document.getElementById("rol")).value;
        const estacion = this.selectedEstacion.codigo;
        if ((rol.localeCompare("observer") === 0) && this.selectedEstacion.codigo == null){
            this.tService.error("Falta seleccionar estación.", "Necesita seleccionar una estación.");
        }else{
            console.log(this.selectedUser.id);
            console.log(rol);
            console.log(estacion);
            this.dbService.asignarRol({
                usuario: this.selectedUser.id,
                role: rol,
                estacion: estacion,
            }).subscribe(
                data => {
                    this.tService.success("Usuario registrado con exito.", "Envio exitoso");
                    formRol.reset();
                    this.unselectEstacion();
                    this.unselectUsuario();
                },
                err => {
                    console.log(err);
                    this.tService.error("", "Ha ocurrido un error");
                    formRol.reset();
                    this.unselectEstacion();
                    this.unselectUsuario();
                }
            );
        }
    }

    cancelar(){
        this.unselectEstacion();
        this.unselectUsuario();
    }
}
