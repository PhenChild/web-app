import { Component, Injectable, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Horario } from "src/app/modelos/horario";
import { DbService } from "src/app/services/database/db.service";

/**
 * Componente para la pagina de horarios
 */
@Component({
    selector: "app-horarios",
    templateUrl: "./horarios.component.html",
    styleUrls: ["./horarios.component.css"]
})

/**
* Root
*/
@Injectable({
    providedIn: "root"
})
export class HorariosComponent implements OnInit {

    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Operador del datatable de las estaciones. */
    dtTrigger: Subject<any> = new Subject();

    /** Lista de horarios */
    horarios: Horario[];

    /** Horario seleccionado */
    selectedHorario = new Horario();

    /** Booleano si se esta editando o no */
    update = false;

    /** Tipos de horarios */
    tiposHoras = [
        "diario",
        "parcial"
    ];

    /** Constructor */
    constructor(private dbService: DbService,
        private modal: NgbModal,
        private tService: ToastrService
    ) { }

    /**
     * Ng on init
     */
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
    /**
     * Se va a editar el horario. Se muestra el formulario de edicion.
     * @param horario Horario a editar
     */
    editarHorario(horario: Horario): void{
        this.update = true;
        this.selectedHorario = horario;
        const table = (<HTMLInputElement>document.getElementById("table"));
        table.style.display = "none";
        const form = (<HTMLInputElement>document.getElementById("form-horario"));
        form.style.display = "";
    }

    /**
     * Se elimina un horario.
     * @param horario Horario a eliminar
     */
    deleteHorario(horario){
        this.dbService.deleteHorario(horario).subscribe(data => {
            this.tService.success("Se elimino el horario con exito.", "Envio exitoso");
            window.location.reload();
        },
        err => {
            console.log(err);
            this.tService.error("", "Ha ocurrido un error");
        });
    }

    /**
     * Funcion para mostrar la pagina para crear un nuevo horario.
     */
    nuevoHorario(){
        this.selectedHorario = new Horario();
        const table = (<HTMLInputElement>document.getElementById("table"));
        table.style.display = "none";
        const form = (<HTMLInputElement>document.getElementById("form-horario"));
        form.style.display = "";
    }

    /**
     * Guarda el nuevo usuario.
     */
    submit(formHorario: NgForm){
        if (this.update){
            this.dbService.updateHorario(this.selectedHorario).subscribe(data => {
                this.tService.success("Horario actualizado con exito.", "Envio exitoso");
                const table = (<HTMLInputElement>document.getElementById("table"));
                table.style.display = "";
                const form = (<HTMLInputElement>document.getElementById("form-horario"));
                form.style.display = "none";
                window.location.reload();
            },
            err => {
                console.log(err);
                this.tService.error("", "Ha ocurrido un error");
            });
        }else{
            this.dbService.addHorario(this.selectedHorario).subscribe(data => {
                this.tService.success("Se agrego un nuevo horario con exito.", "Envio exitoso");
                const table = (<HTMLInputElement>document.getElementById("table"));
                table.style.display = "";
                const form = (<HTMLInputElement>document.getElementById("form-horario"));
                form.style.display = "none";
                window.location.reload();
            },
            err => {
                console.log(err);
                this.tService.error("", "Ha ocurrido un error");
            });
        }

    }

    /**
     * Cancelar el ingreso de nuevo usuario.
     * @param formHorario Fomulario de edicion de horario
     */
    cancelar(formHorario: NgForm){
        this.update = false;
        this.selectedHorario = new Horario();
        const table = (<HTMLInputElement>document.getElementById("table"));
        table.style.display = "";
        const form = (<HTMLInputElement>document.getElementById("form-horario"));
        form.style.display = "none";
    }
}
