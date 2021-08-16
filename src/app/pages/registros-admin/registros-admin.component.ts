import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { EditarRegistro } from "src/app/modelos/editarRegistro";
import { Registro } from "src/app/modelos/registro";
import { DbService } from "src/app/services/database/db.service";

/** Componente para ver los registros en el admin*/
@Component({
    selector: "app-registros-admin",
    templateUrl: "./registros-admin.component.html",
    styleUrls: ["./registros-admin.component.css"]
})
export class RegistrosAdminComponent implements OnInit {

    /** ViewChild */
    @ViewChild(DataTableDirective)

    /** Datatable directive */
    datatableElement: DataTableDirective;

    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Lista de registros seleccionados*/
    registros: Registro[] = [];

    /** Lista de registros */
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
        return fecha.toTimeString().split(" ").slice(0, 1);
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
     * Se abre un modal para editar el valor del registro.
     * @param contenido Contenido del modal
     * @param registro Registro seleccionado
     */
    openModal(contenido, registro): void{
        this.registro.id = registro.id;
        this.registro.valor = registro.valor;
        this.registro.estacion = registro.VariableEstacion.EstacionCodigo;
        this.registro.fecha = registro.fechaObservacion;
        console.log(registro);
        this.modal.open(contenido, {size: "lg"});
    }

    /**
     * Se guarda el cambio del valor.
     */
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
