import { Component, OnInit, OnDestroy } from "@angular/core";
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

    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Lista de registros seleccionados*/
    registros: Registro[] = [];

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
                this.dtTrigger.next();
            });
    }

    /**
     * Elimina los operadores de los datatables
     */
    ngOnDestroy(): void{
        this.dtTrigger.unsubscribe();
    }
}
