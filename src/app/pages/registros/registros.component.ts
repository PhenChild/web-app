import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { Registro } from "../../modelos/registro";
import {DbService} from "../../services/database/db.service";
@Component({
    selector: "app-registro",
    templateUrl: "./registros.component.html",
    styleUrls: ["./registros.component.css"],
})
export class RegistrosComponent implements OnInit, OnDestroy {
    dtOptions: DataTables.Settings = {};
    registros: Registro[] = [];


    dtTrigger: Subject<any> = new Subject<any>();
    constructor(private dbService: DbService) { }

    ngOnInit(): void {

        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 5
        };
        this.dbService.getRegistros()
            .subscribe(data => {
                this.registros = (data as any);
                this.dtTrigger.next();
            });
    }

    ngOnDestroy(): void{
        this.dtTrigger.unsubscribe();
    }
}
