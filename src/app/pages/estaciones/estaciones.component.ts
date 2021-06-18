import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Estacion } from "../../modelos/estacion";
import {DbService} from "../../services/database/db.service";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observador } from "src/app/modelos/observador";

@Component({
    selector: "app-estaciones",
    templateUrl: "./estaciones.component.html",
    styleUrls: ["./estaciones.component.css"],
})
export class EstacionesComponent implements OnInit, OnDestroy {
    dtOptions: DataTables.Settings = {};
    estaciones: Estacion[] = [];
    usuarios: Observador[] = [];
    estacion = new Estacion();
    selectedUser = new Observador();

    dtTrigger1: Subject<any> = new Subject<any>();
    dtTrigger2: Subject<any> = new Subject<any>();
    constructor(
        private dbService: DbService,
        private tService: ToastrService
    ) { }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 7
        };
        this.dbService.getEstaciones()
            .subscribe(data => {
                this.estaciones = (data as any);
                this.dtTrigger1.next();
                console.log(this.estaciones);
            });
    }

    ngOnDestroy(): void{
        this.dtTrigger1.unsubscribe();
        this.dtTrigger2.unsubscribe();
    }

    editarEstacion(estacion){
        this.estacion = estacion;
        this.estacion.latitud = estacion.posicion.coordinates[0];
        this.estacion.longitud = estacion.posicion.coordinates[1];
        this.dbService.getObservadores(this.estacion)
            .subscribe(data => {
                this.usuarios = (data as any);
                console.log(this.usuarios[0]);
                const table = (<HTMLInputElement>document.getElementById("table"));
                const form = (<HTMLInputElement>document.getElementById("form-estacion"));
                table.style.display = "none";
                form.style.display = "block";
                this.dtTrigger2.next();
            });
    }

    selectUsuario(usuario) {
        const table = (<HTMLInputElement>document.getElementById("table-container"));
        table.style.display = "none";
        this.selectedUser.id = usuario.id;
        this.selectedUser.nombre = usuario.User.nombre;
        this.selectedUser.apellido = usuario.User.apellido;
        this.selectedUser.email = usuario.User.email;
        const input = (<HTMLInputElement>document.getElementById("text-usuario"));
        input.style.display = "block";
    }

    unselectUsuario() {
        this.selectedUser = new Observador();
        const table = (<HTMLInputElement>document.getElementById("table-container"));
        table.style.display = "block";
        const input = (<HTMLInputElement>document.getElementById("text-usuario"));
        input.style.display = "none";
    }

    deleteEstacion(estacion){
        this.estacion = estacion;
        this.dbService.deleteEstacion(this.estacion).subscribe(data => {
            this.tService.success("Estacion guardada con exito.", "Envio exitoso");
            this.ngOnInit();
        },
        err => {
            this.tService.error("", "Ha ocurrido un error");
        });
    }

    submit(formEstacion: NgForm) {
        this.estacion.jefeId = this.selectedUser.id;
        this.dbService.updateEstacion(this.estacion)
            .subscribe(
                data => {
                    this.tService.success("Estacion actualizada con exito.", "Envio exitoso");
                    formEstacion.reset();
                    const table = (<HTMLInputElement>document.getElementById("table"));
                    const form = (<HTMLInputElement>document.getElementById("form-estacion"));
                    table.style.display = "none";
                    form.style.display = "block";
                },
                err => {
                    console.log(err);
                    this.tService.error("", "Ha ocurrido un error");
                    formEstacion.reset();
                }
            );
    }

    cancelar(formEstacion: NgForm){
        const table = (<HTMLInputElement>document.getElementById("table"));
        const form = (<HTMLInputElement>document.getElementById("form-estacion"));
        table.style.display = "block";
        form.style.display = "none";
        this.estacion = new Estacion();
        formEstacion.reset();
    }
}
