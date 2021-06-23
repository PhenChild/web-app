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

/**
 * Componente para la pagina de asignación de variables a las estaciones.
 */
@Component({
    selector: "app-asignacion",
    templateUrl: "./asignacion.component.html",
    styleUrls: ["./asignacion.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class AsignacionComponent implements OnInit, OnDestroy {
    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Arreglo de estaciones.*/
    estaciones: Estacion[] = [];

    /** Estacion seleccionada para la asignación de variables.*/
    selectedEstacion = new Estacion();

    /** Lista de Variables */
    variables: Variable[] = [];

    /** Variables seleccionadas para motrar. */
    selectedVariables: VariableHora[] = [];

    /** Variables agregadas, diferentes a las existentes en la base. */
    addedVariables: VariableHora[] = [];

    /** Variables existentes en base que se eliminarán */
    deletedVariables: VariableHora[] = [];

    /** Variable a guardar con su respectiva hora. */
    variableHora: VariableHora;

    /** Arreglo de los horarios disponibles */
    horarios: Horario[] = [];

    /** Operador del datatable de las estaciones. */
    dtTrigger1: Subject<any> = new Subject();

    /** Operador del datatable de las variables */
    dtTrigger2: Subject<any> = new Subject();

    /** Constructor */
    constructor(private dbService: DbService,
        private modal: NgbModal,
        private tService: ToastrService
    ) { }

    /**
     * Llena las tablas de estaciones y variables, ademas llena el
     * arreglo de horarios.
     */
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

    /** Limpia las variables seleccionadas y elimina los operadores de los datatables.*/
    ngOnDestroy(): void {
        this.selectedVariables = [];
        this.dtTrigger1.unsubscribe();
        this.dtTrigger2.unsubscribe();
    }

    /**
     * Selecciona la estación a la que se le asignarán las variables,
     * carga las variables que ya estan registradas en esa estación y muestra
     * la pagina para asignar las variables.
     * @param estacion Estación seleccionada.
     */
    selectEstacion(estacion: Estacion): void {
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

    /**
     * Deselecciona la estación y vuelve a mostrar la tabla de estaciones para
     * seleccionar una nueva.
     */
    unselectEstacion(): void {
        this.selectedEstacion = new Estacion();
        const tablea = (<HTMLInputElement>document.getElementById("estaciones-table"));
        tablea.style.display = "";
        const tableb = (<HTMLInputElement>document.getElementById("variables-table"));
        tableb.style.display = "none";
    }

    /**
     * Selecciona una variable y la agrega a la lista de variables asignadas.
     * @param variable Variable Seleccionada
     *
    selectVariable(variable) {
        const variableHora = new VariableHora();
        variableHora.id = variable.id;
        variableHora.nombre = variable.nombre;
        this.selectedVariables.push(variableHora);
    }*/

    /**
     * Deseleeciona una variable y la elimina de la lista de variables asignadas.
     * @param variable Variable a eliminar
     */
    unselectVariable(variable: VariableHora): void {
        const index = this.selectedVariables.indexOf(variable);
        this.selectedVariables.splice(index, 1);
        if ( this.addedVariables.indexOf(variable) === -1){
            this.deletedVariables.push(variable);
        } else{
            const i = this.addedVariables.indexOf(variable);
            this.addedVariables.splice(i, 1);
        }
    }


    /**
     * Se selecciona un horario para la variable escojida.
     * @param horario Horario para la variable seleccionada
     */
    selectHorario(horario: string): void{
        this.variableHora.idHora = +horario;
        for (const i in this.horarios){
            if (this.horarios[i].id + "" === horario){
                this.variableHora.hora = this.horarios[i].hora;
            }
        }
    }

    /**
     * Muestra la ventana emergente para asignar la hora a la variable seleccionada.
     * @param contenido Contenido de la ventana emergente.
     * @param variable Variable a asignar la hora
     */
    openModal(contenido: string, variable: Variable): void{
        this.variableHora = new VariableHora();
        this.variableHora.id = variable.id;
        this.variableHora.nombre = variable.nombre;
        this.modal.open(contenido, {size: "lg"});
    }

    /**
     * Guarda la variable en la lista de variables seleccionadas.
     */
    saveVariableHora(): void{
        this.selectedVariables.push(this.variableHora);
        const i = this.deletedVariables.indexOf(this.variableHora);
        if ( i !== -1){
            this.deletedVariables.splice(i, 1);
        }else{
            this.addedVariables.push(this.variableHora);
        }
    }

    /**
     * Guarda y asigna todas las variables de la lista de variables a la estacion.
     */
    asignarVariables(): void{
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

