import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Subject } from "rxjs";
import { Registro } from "../../modelos/registro";
import {DbService} from "../../services/database/db.service";

/**
 *Componente para la pagina de registro.
 */
@Component({
    selector: "app-registro",
    templateUrl: "./registros.component.html",
    styleUrls: ["./registros.component.css"],
})
export class RegistrosComponent implements OnInit, OnDestroy {

    /** ViewChild */
    @ViewChild(DataTableDirective)

    /** Datatable directive */
    datatableElement: DataTableDirective;

    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Lista de registros seleccionados*/
    registros: Registro[] = [];

    /** Lista de registros */
    registro = new Registro();

    /** Operador del datatable de los registros */
    dtTrigger: Subject<any> = new Subject<any>();

    /**
     * Constructor
     * @param dbService
     */
    constructor(private dbService: DbService) { }

    /**
     * Obtencion de los registros desde la base de datos
     */
    ngOnInit(): void {

        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 5
        };
        this.dbService.getRegistros()
            .subscribe(data => {
                this.registros = (data as any);
                console.log(this.registros);
                this.dtTrigger.next();
                this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance.columns().every(function () {
                        $("input", this.footer()).on("keyup change", function () {
                            if (dtInstance.column(this["id"]).search() !== this["value"]) {
                                dtInstance
                                    .column(this["id"])
                                    .search(this["value"])
                                    .draw();
                            }
                        });
                    });
                });
            });
    }

    /**
     * Elimina los operadores de los datatables
     */
    ngOnDestroy(): void{
        this.dtTrigger.unsubscribe();
    }

    /**
     * Rectifica el formato de la fecha entregada por la base
     * @param s String de la fecha
     * @returns String de la fecha rectificada.
     */
    rectifyFormat(s) {
        const b = s.split(/\D/);
        return b[0] + "-" + b[1] + "-" + b[2] + "T" +
               b[3] + ":" + b[4] + ":" + b[5] + "." +
               b[6].substr(0, 3) + "+00:00";
    }
    /**
     * Obtiene la hora de la fecha rectificada.
     * @param s String de la fecha
     * @returns La hora de la fecha
     */
    time(s){
        const fecha = new Date(this.rectifyFormat(s));
        return fecha.toTimeString().split(" ").slice(0, 1);
    }
    /**
     * Obtiene el dia de la fecha rectificada.
     * @param s Fecha entregada
     * @returns Dia de la fecha
     */
    date(s){
        const fecha = this.rectifyFormat(s);
        return fecha.split("T")[0];
    }
}
