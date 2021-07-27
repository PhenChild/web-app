import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Estacion } from "src/app/modelos/estacion";
import { Horario } from "src/app/modelos/horario";
import { DbService } from "src/app/services/database/db.service";

@Component({
    selector: "app-horarios",
    templateUrl: "./horarios.component.html",
    styleUrls: ["./horarios.component.css"]
})
export class HorariosComponent implements OnInit {

    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Operador del datatable de las estaciones. */
    dtTrigger: Subject<any> = new Subject();

    horarios: Horario[];

    selectedHorario = new Horario();

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

        this.dbService.getHorarios()
            .subscribe(data => {
                this.horarios = (data as any);
                this.dtTrigger.next();
            });

    }

    editarHorario(horario){

    }

    deleteHorario(horario){

    }

    nuevoHorario(){

    }

    submit(formHorario: NgForm){

    }

    cancelar(formHorario: NgForm){

    }
}
