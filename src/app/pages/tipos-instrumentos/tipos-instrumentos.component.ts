import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { Instrumento } from "src/app/modelos/instrumento";
import { TipoInstrumento } from "src/app/modelos/tipoInstrumento";
import { DbService } from "src/app/services/database/db.service";

@Component({
    selector: "app-tipos-instrumentos",
    templateUrl: "./tipos-instrumentos.component.html",
    styleUrls: ["./tipos-instrumentos.component.css"]
})
export class TiposInstrumentosComponent implements OnInit {

    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Operador del datatable de las estaciones. */
    dtTrigger1: Subject<any> = new Subject();
    instrumentos: TipoInstrumento[];

    selectedInstrumento = new Instrumento();
    update: boolean;

    constructor(private dbService: DbService,
        private tService: ToastrService) { }

    ngOnInit(): void {
        this.update = false;
        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 5
        };

        this.dbService.getTiposInstrumentos()
            .subscribe(data => {
                this.instrumentos = (data as any);
                this.dtTrigger1.next();
            });
    }

    nuevoTipoInstrumento(){
        const table = (<HTMLInputElement>document.getElementById("table"));
        table.style.display = "none";
        const form = (<HTMLInputElement>document.getElementById("form-instrumento"));
        form.style.display = "";
        const tablea = (<HTMLInputElement>document.getElementById("table-estaciones"));
        tablea.style.display = "";
        const tableb = (<HTMLInputElement>document.getElementById("text-estacion"));
        tableb.style.display = "none";
    }

    editarTipoInstrumento(instrumento){
        this.selectedInstrumento = instrumento;
        this.update = true;
        const table = (<HTMLInputElement>document.getElementById("table"));
        table.style.display = "none";
        const form = (<HTMLInputElement>document.getElementById("form-instrumento"));
        form.style.display = "";
    }

    deleteTipoInstrumento(instrumento){
        this.dbService.deleteTipoInstrumento(instrumento).subscribe(data => {
            this.tService.success("Se elimino el tipo de instrumento con exito.", "Envio exitoso");
            window.location.reload();
        },
        err => {
            console.log(err);
            this.tService.error("", "Ha ocurrido un error");
        });
    }

    submit(formInstrumento: NgForm){
        if (this.update){
            this.dbService.updateTipoInstrumento(this.selectedInstrumento).subscribe(data => {
                this.tService.success("Se actualizo el tipo de instrumento con exito.", "Envio exitoso");
                const table = (<HTMLInputElement>document.getElementById("table"));
                table.style.display = "";
                const form = (<HTMLInputElement>document.getElementById("form-instrumento"));
                form.style.display = "none";
            },
            err => {
                console.log(err);
                this.tService.error("", "Ha ocurrido un error");
            });
        }else{
            console.log(this.selectedInstrumento);
            this.dbService.addTipoInstrumento(this.selectedInstrumento).subscribe(data => {
                this.tService.success("Se agrego un tipo de instrumento con exito.", "Envio exitoso");
                const table = (<HTMLInputElement>document.getElementById("table"));
                table.style.display = "";
                const form = (<HTMLInputElement>document.getElementById("form-instrumento"));
                form.style.display = "none";
            },
            err => {
                console.log(err);
                this.tService.error("", "Ha ocurrido un error");
            });
        }
    }

    cancelar(formInstrumento: NgForm){
        window.location.reload();
    }



}
