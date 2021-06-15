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

    editarVariable(variable){
        this.variable = variable;
        const table = (<HTMLInputElement>document.getElementById("table"));
        const form = (<HTMLInputElement>document.getElementById("form-variable"));
        table.style.display = "none";
        form.style.display = "block";
    }


    submit(formVariable: NgForm) {
        this.dbService.updateVariable(this.variable)
            .subscribe(
                data => {
                    this.tService.success("Variable actualizada con exito.", "Envio exitoso");
                    formVariable.reset();
                    const table = (<HTMLInputElement>document.getElementById("table"));
                    const form = (<HTMLInputElement>document.getElementById("form-variable"));
                    table.style.display = "none";
                    form.style.display = "block";
                    this.variable = new Variable();
                },
                err => {
                    this.tService.error("", "Ha ocurrido un error");
                    formVariable.reset();
                }
            );
    }

    cancelar(formVariable: NgForm){
        const table = (<HTMLInputElement>document.getElementById("table"));
        const form = (<HTMLInputElement>document.getElementById("form-variable"));
        table.style.display = "block";
        form.style.display = "none";
        this.variable = new Variable();
        formVariable.reset();
    }

}
