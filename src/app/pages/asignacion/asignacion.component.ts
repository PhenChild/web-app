import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { Estacion } from "../../modelos/estacion";
import { Variable } from "../../modelos/variable";
import { DbService } from "../../services/database/db.service";
import { Horario } from "../../modelos/horario";
import { ViewEncapsulation } from "@angular/core";
import { VariableHora } from "../../modelos/variableHora";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";


@Component({
    selector: "app-asignacion",
    templateUrl: "./asignacion.component.html",
    styleUrls: ["./asignacion.component.css"],
    encapsulation: ViewEncapsulation.None
})

export class AsignacionComponent implements OnInit, OnDestroy {

    dtOptions: DataTables.Settings = {};
    estaciones: Estacion[] = [];
    selectedEstacion = new Estacion();
    variables: Variable[] = [];
    selectedVariables: VariableHora[] = [];
    variableHora: VariableHora;
    horarios: Horario[] = [];
    dtTrigger: Subject<any> = new Subject<any>();


    constructor(private dbService: DbService,
        private modal: NgbModal,
        private tService: ToastrService
    ) { }

    ngOnInit(): void {

        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 5
        };

        this.dbService.getEstaciones()
            .subscribe(data => {
                this.estaciones = (data as any);
                this.dtTrigger.next();
            });

        this.dbService.getVariables()
            .subscribe(data => {
                this.variables = (data as any);
            });

        this.dbService.getHorarios()
            .subscribe(data => {
                this.horarios = (data as any);
            });
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    selectVariable(variable) {
        const variableHora = new VariableHora();
        variableHora.id = variable.id;
        variableHora.nombre = variable.nombre;
        this.selectedVariables.push(variableHora);
    }

    unselectVariable(variable) {
        const index = this.selectedVariables.indexOf(variable);
        this.selectedVariables.splice(index, 1);
    }

    selectEstacion(estacion) {
        const tablea = (<HTMLInputElement>document.getElementById("estaciones-table"));
        tablea.style.display = "none";
        this.selectedEstacion = estacion;
        const tableb = (<HTMLInputElement>document.getElementById("variables-table"));
        tableb.style.display = "";
    }

    unselectEstacion() {
        this.selectedEstacion = new Estacion();
        const tablea = (<HTMLInputElement>document.getElementById("estaciones-table"));
        tablea.style.display = "";
        const tableb = (<HTMLInputElement>document.getElementById("variables-table"));
        tableb.style.display = "none";
    }

    selectHorario(horario){
        this.variableHora.idHora = horario;
        for (const i in this.horarios){
            if (this.horarios[i].id === horario){
                this.variableHora.hora = this.horarios[i].hora;
            }
        }
    }

    openModal(contenido, variable){
        this.variableHora = new VariableHora();
        this.variableHora.id = variable.id;
        this.variableHora.nombre = variable.nombre;
        this.modal.open(contenido, {size: "lg"});
    }

    saveVariableHora(){
        this.selectedVariables.push(this.variableHora);
    }

    asignarVariables(){
        this.dbService.asignarVariables(
            {
                codigoEstacion: this.selectedEstacion.codigo,
                variables: this.selectedVariables
            })
            .subscribe(data => {
                this.tService.success("", "Asignacion Exitosa");

            }, err => {
                this.tService.error("", "Ha ocurrrido un error.");
            });
    }
}

