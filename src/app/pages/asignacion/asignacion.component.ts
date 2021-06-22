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
    addedVariables: VariableHora[] = [];
    deletedVariables: VariableHora[] = [];
    variableHora: VariableHora;
    horarios: Horario[] = [];
    dtTrigger1: Subject<any> = new Subject();
    dtTrigger2: Subject<any> = new Subject();


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
                this.dtTrigger1.next();
            });

        this.dbService.getVariables()
            .subscribe(data => {
                this.variables = (data as any);
                this.dtTrigger2.next();
            });

        this.dbService.getHorarios()
            .subscribe(data => {
                this.horarios = (data as any);
            });
    }

    ngOnDestroy(): void {
        this.selectedVariables = [];
        this.dtTrigger1.unsubscribe();
        this.dtTrigger2.unsubscribe();
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
        if ( this.addedVariables.indexOf(variable) === -1){
            this.deletedVariables.push(variable);
        } else{
            const i = this.addedVariables.indexOf(variable);
            this.addedVariables.splice(i, 1);
        }
        console.log("deleted:" + this.deletedVariables);
        console.log("added" + this.addedVariables);
    }

    selectEstacion(estacion) {
        this.dbService.getVariablesEstacion(estacion).subscribe(data => {
            if (data.length > 0){
                for (const vari of data){
                    const varHora = new VariableHora();
                    varHora.hora = vari.Horario.hora;
                    varHora.id = vari.Variable.id;
                    varHora.idHora = vari.Horario.id;
                    varHora.nombre = vari.Variable.nombre;
                    this.selectedVariables.push(varHora);
                }
            }
            this.selectedEstacion = estacion;
            const tablea = (<HTMLInputElement>document.getElementById("estaciones-table"));
            tablea.style.display = "none";
            const tableb = (<HTMLInputElement>document.getElementById("variables-table"));
            tableb.style.display = "";
        }, err => {
            console.log(err);
        });
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
            if (this.horarios[i].id + "" === horario){
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
        const i = this.deletedVariables.indexOf(this.variableHora);
        if ( i !== -1){
            this.deletedVariables.splice(i, 1);
        }else{
            this.addedVariables.push(this.variableHora);
        }
        console.log("deleted:" + this.deletedVariables);
        console.log("added" + this.addedVariables);
    }

    asignarVariables(){
        console.log(this.selectedVariables);
        this.dbService.asignarVariables(
            {
                codigoEstacion: this.selectedEstacion.codigo,
                variablesAgregadas: this.addedVariables,
                variablesEliminadas: this.deletedVariables
            })
            .subscribe(data => {
                this.tService.success("", "Asignacion Exitosa");

            }, err => {
                console.log(err);
                this.tService.error("", "Ha ocurrrido un error.");
            });
    }
}

