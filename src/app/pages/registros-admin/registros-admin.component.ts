import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { EditarRegistro } from "src/app/modelos/editarRegistro";
import { Registro } from "src/app/modelos/registro";
import { DbService } from "src/app/services/database/db.service";

@Component({
    selector: "app-registros-admin",
    templateUrl: "./registros-admin.component.html",
    styleUrls: ["./registros-admin.component.css"]
})
export class RegistrosAdminComponent implements OnInit {

    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;

    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Lista de registros seleccionados*/
    registros: Registro[] = [];

    registro = new EditarRegistro();

    /** Operador del datatable de los registros */
    dtTrigger: Subject<any> = new Subject<any>();

    /**
     * Constructor
     * @param dbService
     */
    constructor(private dbService: DbService,
        private modal: NgbModal,
        private tService: ToastrService) { }

    /**
     * Obtencion de los registros desde la base de datos
     */
    ngOnInit(): void {

        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 5
        };
        this.dbService.getRegistros()
            .subscribe(data => {
                this.registros = (data as any);
                this.dtTrigger.next(); this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
                    dtInstance.columns().every(function () {
                        $("input", this.footer()).on("keyup change", function () {
                            if (dtInstance.column(this["id"]).search() !== this["value"]) {
                                dtInstance
                                    .column(this["id"])
                                    .search(this["value"])
                                    .draw();
                            }
                        });
                    });
                });
            });
    }


    /**
     * Elimina los operadores de los datatables
     */
    ngOnDestroy(): void{
        this.dtTrigger.unsubscribe();
    }


    rectifyFormat(s) {
        const b = s.split(/\D/);
        return b[0] + "-" + b[1] + "-" + b[2] + "T" +
               b[3] + ":" + b[4] + ":" + b[5] + "." +
               b[6].substr(0, 3) + "+00:00";
    }

    time(s){
        const fecha = new Date(this.rectifyFormat(s));
        return fecha.toTimeString().split(" ").slice(0, 1);
    }

    date(s){
        const fecha = this.rectifyFormat(s);
        return fecha.split("T")[0];
    }

    openModal(contenido, registro): void{
        this.registro.id = registro.id;
        this.registro.valor = registro.valor;
        this.registro.estacion = registro.VariableEstacion.EstacionCodigo;
        this.registro.fecha = registro.fechaObservacion;
        console.log(registro);
        this.modal.open(contenido, {size: "lg"});
    }

    saveValor(){
        this.dbService.updateRegistro(this.registro).subscribe(data => {
            this.tService.success("", "Valor actualizado con exito");
            window.location.reload();

        }, err => {
            console.log(err);
            this.tService.error("", "Ha ocurrrido un error.");
        });
    }
}
