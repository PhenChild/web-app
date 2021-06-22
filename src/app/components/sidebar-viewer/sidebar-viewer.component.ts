import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

/** Interfaz para informacion de las rutas. */
declare interface RouteInfo {
    /** Path */
    path: string;

    /** Titulo */
    title: string;

    /** Icono */
    icon: string;

    /** Clase */
    class: string;
}

/** Componente para la barra lateral de navegación. */
export const ROUTES: RouteInfo[] = [
    { path: "/viewer-layout/registros", title: "Registros",  icon: "ni-collection text-white", class: "" },
];

@Component({
    selector: "app-sidebar-viewer",
    templateUrl: "./sidebar-viewer.component.html",
    styleUrls: ["./sidebar-viewer.component.scss"]
})
export class SidebarViewerComponent implements OnInit {
    /** Items del menu */
    public menuItems: any[];

    /** Esta o no colapsado */
    public isCollapsed = true;

    /** Constructor */
    constructor(private router: Router) { }

    /** Inicializador. */
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
        });
    }
}
