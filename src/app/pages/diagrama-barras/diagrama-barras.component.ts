import { Component, Injectable, OnInit, ViewEncapsulation } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Chart, registerables } from "chart.js";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Estacion } from "src/app/modelos/estacion";
import { Filter } from "src/app/modelos/filter";
import { VarHora } from "src/app/modelos/varhora";
import { Variable } from "src/app/modelos/variable";
import { DbService } from "src/app/services/database/db.service";
Chart.register(...registerables);

/** Componente para la visualizacion de registros en diagrama de barras. */
@Component({
    selector: "app-diagrama-barras",
    templateUrl: "./diagrama-barras.component.html",
    styleUrls: ["./diagrama-barras.component.css"]
})
@Injectable({
    providedIn: "root"
})
export class DiagramaBarrasComponent implements OnInit {

    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Operador del datatable de las estaciones. */
    dtTrigger1: Subject<any> = new Subject();

    /** Operador del datatable de las variables. */
    dtTrigger2: Subject<any> = new Subject();

    /** Lista de estaciones */
    estaciones: Estacion[];

    /** Lista de variables */
    variables: Variable[];

    /** Lista de valores que sera entregado al chartjs */
    valores: [];

    /** Lista de fechas */
    fechas: [];

    /** Chart para la pagina. */
    myChart: Chart;

    /** Filtro para generar el grafico. */
    filter = new Filter();

    /** VariableHora seleccionada */
    selectedItem = new VarHora();

    /** Constructor. */
    constructor(private dbService: DbService, private tService: ToastrService) { }

    /** Ng on init */
    ngOnInit(): void {
        this.dbService.getEstaciones()
            .subscribe(data => {
                this.estaciones = (data as any);
                this.dtTrigger1.next();
            });
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
        return fecha.toTimeString().split(" ").slice(0, 2);
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

    /**
     * Selecciona una estacion
     * @param estacion Estacion seleccionada
     */
    selectEstacion(estacion: Estacion){
        this.dbService.getVariablesEstacion(estacion).subscribe(data => {
            if (data.length > 0){
                this.variables = (data as any);
                this.dtTrigger2.next();
            }
            this.filter.codigoEstacion = estacion.codigo;
            const tableEstaciones = (<HTMLInputElement>document.getElementById("table-estaciones"));
            tableEstaciones.style.display = "none";
            const text = (<HTMLInputElement>document.getElementById("text-estacion"));
            text.style.display = "";
            const variables = (<HTMLInputElement>document.getElementById("container-variables"));
            variables.style.display = "";
            const tableVariables = (<HTMLInputElement>document.getElementById("table-variables"));
            tableVariables.style.display = "";
            const textVariable = (<HTMLInputElement>document.getElementById("text-variable"));
            textVariable.style.display = "none";
        }, err => {
            console.log(err);
        });
    }

    /**
     * Deselecciona una estacion
     */
    unselectEstacion(){
        window.location.reload();
    }

    /**
     * Se selecciona una variable
     * @param item Item seleccionado
     */
    selectVariable(item){
        this.filter.nombreVariable = item.Variable.nombre;
        this.filter.idVariable = item.Variable.id;
        console.log(this.filter);
        const tableVariables = (<HTMLInputElement>document.getElementById("table-variables"));
        tableVariables.style.display = "none";
        const text = (<HTMLInputElement>document.getElementById("text-variable"));
        text.style.display = "";
        const fechaInicio = (<HTMLInputElement>document.getElementById("fechaInicio"));
        fechaInicio.style.display = "";
        const fechaFin = (<HTMLInputElement>document.getElementById("fechaFin"));
        fechaFin.style.display = "";

    }

    /**
     * Se deselecciona una variable
     */
    unselectVariable(){
        this.filter.nombreVariable = "";
        this.filter.idVariable = "";
        const tableVariables = (<HTMLInputElement>document.getElementById("table-variables"));
        tableVariables.style.display = "";
        const text = (<HTMLInputElement>document.getElementById("text-variable"));
        text.style.display = "none";
        const fechaInicio = (<HTMLInputElement>document.getElementById("fechaInicio"));
        fechaInicio.style.display = "none";
        const fechaFin = (<HTMLInputElement>document.getElementById("fechaFin"));
        fechaFin.style.display = "none";
    }


    /**
     * Se genera el filtro
     * @param formDiagrama Formulario de filtro.
     */
    submit(formDiagrama: NgForm){
        this.dbService.registroDiagrama(this.filter).subscribe(data => {
            this.generarTabla(data);
            this.tService.success("Se genero con exito el diagrama.", "Envio exitoso");
            const form = (<HTMLInputElement>document.getElementById("form-filter"));
            form.style.display = "none";
            const diagrama = (<HTMLInputElement>document.getElementById("diagram"));
            diagrama.style.display = "";

        },
        err => {
            console.log(err);
            this.tService.error("", "Ha ocurrido un error");
        });

    }

    /**
     * Cancelar el formulario.
     * @param formFilter Formulario del filtro
     */
    cancelar(formFilter: NgForm){
        window.location.reload();
    }

    /**
     * Se genera el grafico de barras.
     * @param data Datos a agregar en la grafica.
     */
    generarTabla(data) {
        console.log(data);
        this.valores = data.map( a => parseInt(a.valor, 10));
        this.fechas = data.map(a => a.VariableEstacion.Horario.hora + " " + this.date(a.fechaObservacion));
        this.myChart = new Chart("myChart", {
            type: "bar",
            data: {
                labels: this.fechas,
                datasets: [{
                    label: "Valor de medicion",
                    data: this.valores,
                    borderWidth: 1,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgb(54, 162, 235)"
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    }
                }
            }
        });
    }

    /**
     * Funcion para generar otro filtro.
     * @param formFilter Formulario de filtro
     */
    otro(){
        window.location.reload();
    }
}
