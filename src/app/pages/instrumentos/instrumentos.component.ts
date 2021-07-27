import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Estacion } from "src/app/modelos/estacion";
import { Instrumento } from "src/app/modelos/instrumento";
import { DbService } from "src/app/services/database/db.service";

@Component({
    selector: "app-instrumentos",
    templateUrl: "./instrumentos.component.html",
    styleUrls: ["./instrumentos.component.css"]
})
export class InstrumentosComponent implements OnInit {

    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Operador del datatable de las estaciones. */
    dtTrigger1: Subject<any> = new Subject();

    /** Operador del datatable de las estaciones. */
    dtTrigger2: Subject<any> = new Subject();

    instrumentos: Instrumento[];
    estaciones: Estacion[];


    selectedInstrumento = new Instrumento();
    selectedEstacion = new Estacion();

    /** Constructor */
    constructor(private dbService: DbService,
        private modal: NgbModal,
        private tService: ToastrService
    ) { }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 5
        };

        this.dbService.getInstrumentos()
            .subscribe(data => {
                this.instrumentos = (data as any);
                this.dtTrigger1.next();
            });

        this.dbService.getEstaciones()
            .subscribe(data => {
                this.estaciones = (data as any);
                this.dtTrigger2.next();
            });



    }

    nuevoInstrumento(){

    }

    editarInstrumento(instrumento){

    }

    deleteInstrumento(instrumento){

    }

    submit(formInstrumento: NgForm){

    }

    cancelar(formInstrumento: NgForm){

    }
}
