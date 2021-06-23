import { Component, } from "@angular/core";

/** Componente raíz de toda la aplicación. */
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    /** Titulo de la pagina. */
    title = "CIIFEN";
}
