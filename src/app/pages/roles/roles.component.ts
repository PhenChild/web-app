import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../modelos/usuario";
import { DbService } from "../../services/database/db.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject } from "rxjs";
import { Estacion } from "../../modelos/estacion";


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
    selectedUser: Usuario;

    closeResult: string;

    dtTrigger: Subject<any> = new Subject<any>();
    constructor(
        private dbService: DbService,
        private modalService: NgbModal,
    ) { }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 4
        };

        this.dbService.getUsuarios()
            .subscribe(data => {
                this.usuarios = data;
                this.dtTrigger.next();
            });
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
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

    unselectUsuario(usuario) {
        this.selectedUser = new Usuario();
        const form = (<HTMLInputElement>document.getElementById("rol-form"));
        form.style.display = "";
        const table = (<HTMLInputElement>document.getElementById("usuarios-table"));
        table.style.display = "none";
    }


}
