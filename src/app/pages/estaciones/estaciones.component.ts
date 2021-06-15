import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Estacion } from "../../modelos/estacion";
import {DbService} from "../../services/database/db.service";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-estaciones",
    templateUrl: "./estaciones.component.html",
    styleUrls: ["./estaciones.component.css"],
})
export class EstacionesComponent implements OnInit, OnDestroy {
    dtOptions: DataTables.Settings = {};
    estaciones: Estacion[] = [];
    estacion = new Estacion();

    dtTrigger: Subject<any> = new Subject<any>();
    constructor(private dbService: DbService,
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
                this.dtTrigger.next();
            });
    }

    ngOnDestroy(): void{
        this.dtTrigger.unsubscribe();
    }

    editarEstacion(estacion){
        this.estacion = estacion;
        const table = (<HTMLInputElement>document.getElementById("table"));
        const form = (<HTMLInputElement>document.getElementById("form-estacion"));
        table.style.display = "none";
        form.style.display = "block";
    }

    submit(formEstacion: NgForm) {
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
