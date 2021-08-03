import { Variable } from "@angular/compiler/src/render3/r3_ast";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Chart, registerables } from "chart.js";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Estacion } from "src/app/modelos/estacion";
import { Filter } from "src/app/modelos/filter";
import { Registro } from "src/app/modelos/registro";
import { DbService } from "src/app/services/database/db.service";
Chart.register(...registerables);

@Component({
    selector: "app-diagrama-barras",
    templateUrl: "./diagrama-barras.component.html",
    styleUrls: ["./diagrama-barras.component.css"]
})
export class DiagramaBarrasComponent implements OnInit {

    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Operador del datatable de las estaciones. */
    dtTrigger1: Subject<any> = new Subject();

    estaciones: Estacion[];
    variables: Variable[];

    valores: [];
    fechas: [];

    myChart: Chart;

    filter = new Filter();

    constructor(private dbService: DbService, private tService: ToastrService) { }

    ngOnInit(): void {
        this.dbService.getEstaciones()
            .subscribe(data => {
                this.estaciones = (data as any);
                console.log(data);
                this.dtTrigger1.next();
            });
    }

    rectifyFormat(s) {
        const b = s.split(/\D/);
        return b[0] + "-" + b[1] + "-" + b[2] + "T" +
               b[3] + ":" + b[4] + ":" + b[5] + "." +
               b[6].substr(0, 3) + "+00:00";
    }

    time(s){
        const fecha = new Date(this.rectifyFormat(s));
        return fecha.toTimeString().split(" ").slice(0, 2);
    }

    date(s){
        const fecha = new Date(this.rectifyFormat(s));
        return fecha.toDateString();
    }

    selectEstacion(estacion: Estacion){
        this.dbService.getVariablesEstacion(estacion).subscribe(data => {
            if (data.length > 0){
                console.log(data);
                this.variables = (data as any);
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

    unselectEstacion(){
        this.filter.codigoEstacion = "";
        const tableEstaciones = (<HTMLInputElement>document.getElementById("table-estaciones"));
        tableEstaciones.style.display = "";
        const text = (<HTMLInputElement>document.getElementById("text-estacion"));
        text.style.display = "none";
        const variables = (<HTMLInputElement>document.getElementById("container-variables"));
        variables.style.display = "none";
        const text2 = (<HTMLInputElement>document.getElementById("text-variable"));
        text2.style.display = "none";
        const fechaInicio = (<HTMLInputElement>document.getElementById("fechaInicio"));
        fechaInicio.style.display = "none";
        const fechaFin = (<HTMLInputElement>document.getElementById("fechaFin"));
        fechaFin.style.display = "none";
    }

    selectVariable(item){
        this.filter.nombreVariable = item.Variable.nombre;
        this.filter.idVariable = item.Variable.id;
        const tableVariables = (<HTMLInputElement>document.getElementById("table-variables"));
        tableVariables.style.display = "none";
        const text = (<HTMLInputElement>document.getElementById("text-variable"));
        text.style.display = "";
        const fechaInicio = (<HTMLInputElement>document.getElementById("fechaInicio"));
        fechaInicio.style.display = "";
        const fechaFin = (<HTMLInputElement>document.getElementById("fechaFin"));
        fechaFin.style.display = "";

    }

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

    submit(formDiagrama: NgForm){
        console.log(this.filter);
        this.dbService.registroDiagrama(this.filter).subscribe(data => {
            console.log(data);
            this.generarTabla(data);
            this.tService.success("Se genero con exito el diagrama.", "Envio exitoso");
            this.filter = new Filter();
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

    cancelar(formFilter: NgForm){
        formFilter.reset();
        this.filter = new Filter();
        this.unselectVariable();
        this.unselectEstacion();
    }


    generarTabla(data) {
        this.valores = data.map( a => parseInt(a.valor, 10));
        this.fechas = data.map(a => this.time(a.fechaObservacion) + " " + this.date(a.fechaObservacion));
        this.myChart = new Chart("myChart", {
            type: "bar",
            data: {
                labels: this.fechas,
                datasets: [{
                    label: "Valor de medicion",
                    data: this.valores,
                    borderWidth: 1
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

    otro(formFilter){
        if (this.myChart) {
            this.myChart.destroy();
        }
        this.cancelar(formFilter);
        const form = (<HTMLInputElement>document.getElementById("form-filter"));
        form.style.display = "";
        const diagrama = (<HTMLInputElement>document.getElementById("diagram"));
        diagrama.style.display = "none";
    }
}
