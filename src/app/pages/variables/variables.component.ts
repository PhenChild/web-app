import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import {ViewEncapsulation} from "@angular/core";
import {DbService} from "../../services/database/db.service";
import { Variable } from "../../modelos/variable";
import { ToastrService } from "ngx-toastr";
import { NgForm } from "@angular/forms";

/**
 * Componente para la pagina de edición de variables.
 */
@Component({
    selector: "app-variables",
    templateUrl: "./variables.component.html",
    styleUrls: ["./variables.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class VariablesComponent implements OnInit, OnDestroy {
    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Variable */
    variables: any;

    /** Variable seleccionada */
    variable = new Variable();

    /** Operador del datatable de las variables */
    dtTrigger: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private dbService: DbService,
        private tService: ToastrService
    ) {  }

    /**
     * Obtencion de las variables desde la base de datos
     */
    ngOnInit(): void {
        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 7
        };

        this.dbService.getVariables()
            .subscribe(data => {
                this.variables = (data as any);
                this.dtTrigger.next();
            });
    }


    /**
     * Elimina los operadores de los datatables
     */
    ngOnDestroy(): void{
        this.dtTrigger.unsubscribe();
    }

    /**
     * Editar las variables
     * @param variable varibale con datos para la actualizacion de la variable
     */
    editarVariable(variable: Variable): void {
        this.variable = variable;
        const table = (<HTMLInputElement>document.getElementById("table"));
        const form = (<HTMLInputElement>document.getElementById("form-variable"));
        table.style.display = "none";
        form.style.display = "block";
    }

    /**
     * Eliminar una varibale
     * @param variable variable que se desea eliminar
     */
    deleteVariable(variable: Variable): void {
        this.variable = variable;
        this.dbService.deleteVariable(this.variable).subscribe(data => {
            this.tService.success("Estacion guardada con exito.", "Envio exitoso");
            window.location.reload();
        },
        err => {
            console.log(err);
            this.tService.error("", "Ha ocurrido un error");
        });
    }

    /**
     * Guardado de la actualizacion de la variable
     * @param formVariable form de la variable a actualizar
     */
    submit(formVariable: NgForm): void  {
        this.dbService.updateVariable(this.variable)
            .subscribe(
                data => {
                    this.tService.success("Variable actualizada con exito.", "Envio exitoso");
                    formVariable.reset();
                    const table = (<HTMLInputElement>document.getElementById("table"));
                    const form = (<HTMLInputElement>document.getElementById("form-variable"));
                    table.style.display = "block";
                    form.style.display = "none";
                    this.variable = new Variable();
                    window.location.reload();
                },
                err => {
                    this.tService.error("", "Ha ocurrido un error");
                    formVariable.reset();
                }
            );
    }

    /**
     * Opcion de cancelar
     * @param formVariable form de variable
     */
    cancelar(formVariable: NgForm): void {
        const table = (<HTMLInputElement>document.getElementById("table"));
        const form = (<HTMLInputElement>document.getElementById("form-variable"));
        table.style.display = "block";
        form.style.display = "none";
        this.variable = new Variable();
        formVariable.reset();
    }

}
