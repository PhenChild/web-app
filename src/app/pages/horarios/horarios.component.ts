import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
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

    update = false;

    tiposHoras = [
        "diario",
        "parcial"
    ];

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

    editarHorario(horario: Horario): void{
        this.update = true;
        this.selectedHorario = horario;
        const table = (<HTMLInputElement>document.getElementById("table"));
        table.style.display = "none";
        const form = (<HTMLInputElement>document.getElementById("form-horario"));
        form.style.display = "";
    }

    deleteHorario(horario){
        this.dbService.deleteHorario(horario).subscribe(data => {
            this.tService.success("Se elimino el horario con exito.", "Envio exitoso");
        },
        err => {
            console.log(err);
            this.tService.error("", "Ha ocurrido un error");
        });
    }

    nuevoHorario(){
        this.selectedHorario = new Horario();
        const table = (<HTMLInputElement>document.getElementById("table"));
        table.style.display = "none";
        const form = (<HTMLInputElement>document.getElementById("form-horario"));
        form.style.display = "";
    }

    submit(formHorario: NgForm){
        if (this.update){
            console.log(this.selectedHorario.hora);

            this.dbService.updateHorario(this.selectedHorario).subscribe(data => {
                this.tService.success("Horario actualizado con exito.", "Envio exitoso");
                const table = (<HTMLInputElement>document.getElementById("table"));
                table.style.display = "";
                const form = (<HTMLInputElement>document.getElementById("form-horario"));
                form.style.display = "none";
            },
            err => {
                console.log(err);
                this.tService.error("", "Ha ocurrido un error");
            });
        }else{
            console.log(this.selectedHorario.hora);

            this.dbService.addHorario(this.selectedHorario).subscribe(data => {
                this.tService.success("Se agrego un nuevo horario con exito.", "Envio exitoso");
                const table = (<HTMLInputElement>document.getElementById("table"));
                table.style.display = "";
                const form = (<HTMLInputElement>document.getElementById("form-horario"));
                form.style.display = "none";
            },
            err => {
                console.log(err);
                this.tService.error("", "Ha ocurrido un error");
            });
        }

    }

    cancelar(formHorario: NgForm){
        this.update = false;
        this.selectedHorario = new Horario();
        const table = (<HTMLInputElement>document.getElementById("table"));
        table.style.display = "";
        const form = (<HTMLInputElement>document.getElementById("form-horario"));
        form.style.display = "none";
    }
}
