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
    { path: "/viewer-layout/diagrama-barras", title: "Diagrama de barras",  icon: "ni-chart-bar-32 text-white", class: "" },
];

/**
 * Componente de side viewr
 */
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
    ngOnInit(): void {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.router.events.subscribe(() => {
            this.isCollapsed = true;
        });
    }
}
