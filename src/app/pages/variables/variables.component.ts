import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import {ViewEncapsulation} from "@angular/core";
import {DbService} from "../../services/database/db.service";
import { Variable } from "../../modelos/variable";
import { ToastrService } from "ngx-toastr";
import { NgForm } from "@angular/forms";

@Component({
    selector: "app-variables",
    templateUrl: "./variables.component.html",
    styleUrls: ["./variables.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class VariablesComponent implements OnInit, OnDestroy {
    dtOptions: DataTables.Settings = {};
    variables: any;
    variable = new Variable();
    dtTrigger: Subject<any> = new Subject<any>();

    constructor(
        private dbService: DbService,
        private tService: ToastrService
    ) {  }

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


    ngOnDestroy(): void{
        this.dtTrigger.unsubscribe();
    }

    editarVariable(variable: Variable): void{
        this.variable = variable;
        const table = (<HTMLInputElement>document.getElementById("table"));
        const form = (<HTMLInputElement>document.getElementById("form-variable"));
        table.style.display = "none";
        form.style.display = "block";
    }

    deleteVariable(variable: Variable): void{
        this.variable = variable;
        this.dbService.deleteVariable(this.variable).subscribe(data => {
            this.tService.success("Estacion guardada con exito.", "Envio exitoso");
        },
        err => {
            console.log(err);
            this.tService.error("", "Ha ocurrido un error");
        });
    }


    submit(formVariable: NgForm): void {
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
                },
                err => {
                    this.tService.error("", "Ha ocurrido un error");
                    formVariable.reset();
                }
            );
    }

    cancelar(formVariable: NgForm): void{
        const table = (<HTMLInputElement>document.getElementById("table"));
        const form = (<HTMLInputElement>document.getElementById("form-variable"));
        table.style.display = "block";
        form.style.display = "none";
        this.variable = new Variable();
        formVariable.reset();
    }

}
