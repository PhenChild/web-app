import { Component, OnInit } from "@angular/core";
import {ViewEncapsulation} from "@angular/core";

/**
 * Componente layout de visualizador
 */
@Component({
    selector: "app-viewer-layout",
    templateUrl: "./viewer-layout.component.html",
    styleUrls: ["./viewer-layout.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class ViewerLayoutComponent implements OnInit {

    /**
     * Constructor
     */
    constructor() { }

    /**
     * Inicializador
     */
    ngOnInit(): void {
    }

}
