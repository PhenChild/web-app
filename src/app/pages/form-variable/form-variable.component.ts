import { Component, OnInit } from "@angular/core";
import { Variable } from "../../modelos/variable";
import { NgForm } from "@angular/forms";
import { Injectable } from "@angular/core";
import { DbService } from "../../services/database/db.service";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-form-variable",
    templateUrl: "./form-variable.component.html",
    styleUrls: ["./form-variable.component.css"]
})

@Injectable({
    providedIn: "root"
})

export class FormVariableComponent implements OnInit {

    variable = new Variable();

    constructor(
        private dbService: DbService,
        private tService: ToastrService
    ) { }

    ngOnInit(): void {
    }

    onSubmit(formVariable: NgForm): void {
        this.dbService.addVariable(this.variable)
            .subscribe(
                data => {
                    this.tService.success("Variable registrada con exito.", "Envio exitoso");
                    formVariable.reset();
                },
                err => {
                    this.tService.error("", "Ha ocurrido un error");
                    formVariable.reset();
                }
            );
    }

}
