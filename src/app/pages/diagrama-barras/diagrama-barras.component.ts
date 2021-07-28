import { Component, OnInit } from "@angular/core";
import { Chart, registerables } from "chart.js";
import { Registro } from "src/app/modelos/registro";
import { DbService } from "src/app/services/database/db.service";
Chart.register(...registerables);

@Component({
    selector: "app-diagrama-barras",
    templateUrl: "./diagrama-barras.component.html",
    styleUrls: ["./diagrama-barras.component.css"]
})
export class DiagramaBarrasComponent implements OnInit {

    valores: [];
    fechas: [];
    constructor(private dbService: DbService) { }

    ngOnInit(): void {

        this.dbService.getRegistros()
            .subscribe(data => {
                this.valores = data.map( a => parseInt(a.valor, 10));
                this.fechas = data.map(a => this.time(a.fechaObservacion) + " " + this.date(a.fechaObservacion));
                console.log([12, 19, 3, 5, 2, 3]);

                const myChart = new Chart("myChart", {
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
                                beginAtZero: true
                            }
                        }
                    }
                });
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

}
