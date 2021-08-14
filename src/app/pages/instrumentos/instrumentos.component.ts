import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Estacion } from "src/app/modelos/estacion";
import { Instrumento } from "src/app/modelos/instrumento";
import { TipoInstrumento } from "src/app/modelos/tipoInstrumento";
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
    tipos: TipoInstrumento[];

    selectedInstrumento = new Instrumento();
    selectedEstacion = new Estacion();

    update = false;

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
        this.dbService.getTiposInstrumentos()
            .subscribe(data => {
                this.tipos = (data as any);
            });
    }

    nuevoInstrumento(){
        const table = (<HTMLInputElement>document.getElementById("table"));
        table.style.display = "none";
        const form = (<HTMLInputElement>document.getElementById("form-instrumento"));
        form.style.display = "";
        const tablea = (<HTMLInputElement>document.getElementById("table-estaciones"));
        tablea.style.display = "";
        const tableb = (<HTMLInputElement>document.getElementById("text-estacion"));
        tableb.style.display = "none";
    }

    editarInstrumento(instrumento){
        this.selectedInstrumento = instrumento;
        this.update = true;
        const table = (<HTMLInputElement>document.getElementById("table"));
        table.style.display = "none";
        const form = (<HTMLInputElement>document.getElementById("form-instrumento"));
        form.style.display = "";
        const tablea = (<HTMLInputElement>document.getElementById("table-estaciones"));
        tablea.style.display = "none";
        const tableb = (<HTMLInputElement>document.getElementById("text-estacion"));
        tableb.style.display = "";
    }

    deleteInstrumento(instrumento){
        this.dbService.deleteInstrumento(instrumento).subscribe(data => {
            this.tService.success("Se elimino el instrumento con exito.", "Envio exitoso");
            window.location.reload();
        },
        err => {
            console.log(err);
            this.tService.error("", "Ha ocurrido un error");
        });
    }

    submit(formInstrumento: NgForm){
        if (this.update){
            this.dbService.updateInstrumento(this.selectedInstrumento).subscribe(data => {
                this.tService.success("Se actualizo el instrumento con exito.", "Envio exitoso");
                const table = (<HTMLInputElement>document.getElementById("table"));
                table.style.display = "";
                const form = (<HTMLInputElement>document.getElementById("form-instrumento"));
                form.style.display = "none";
                window.location.reload();
            },
            err => {
                console.log(err);
                this.tService.error("", "Ha ocurrido un error");
            });
        }else{
            console.log(this.selectedInstrumento);
            this.dbService.addInstrumento(this.selectedInstrumento).subscribe(data => {
                this.tService.success("Se agrego un instrumento con exito.", "Envio exitoso");
                const table = (<HTMLInputElement>document.getElementById("table"));
                table.style.display = "";
                const form = (<HTMLInputElement>document.getElementById("form-instrumento"));
                form.style.display = "none";
                window.location.reload();
            },
            err => {
                console.log(err);
                this.tService.error("", "Ha ocurrido un error");
            });
        }
    }

    cancelar(formInstrumento: NgForm){
        this.update = false;
        formInstrumento.reset();
        this.selectedInstrumento = new Instrumento();
        const table = (<HTMLInputElement>document.getElementById("table"));
        table.style.display = "";
        const form = (<HTMLInputElement>document.getElementById("form-instrumento"));
        form.style.display = "none";
        window.location.reload();
    }

    selectEstacion(estacion: Estacion): void {
        this.selectedInstrumento.EstacionCodigo = estacion.codigo;
        const tablea = (<HTMLInputElement>document.getElementById("table-estaciones"));
        tablea.style.display = "none";
        const tableb = (<HTMLInputElement>document.getElementById("text-estacion"));
        tableb.style.display = "";
    }

    unselectEstacion(){
        this.selectedInstrumento.EstacionCodigo = "";
        const tablea = (<HTMLInputElement>document.getElementById("table-estaciones"));
        tablea.style.display = "";
        const tableb = (<HTMLInputElement>document.getElementById("text-estacion"));
        tableb.style.display = "none";
    }
}
