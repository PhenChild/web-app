import { Routes } from "@angular/router";


import { RegistrosComponent } from "../../pages/registros/registros.component";
import { DiagramaBarrasComponent } from "../../pages/diagrama-barras/diagrama-barras.component";
import { MapaComponent } from "../../pages/mapa/mapa.component";



export const viewerLayoutRoutes: Routes = [
    { path: "registros",          component: RegistrosComponent },
    { path: "diagrama-barras",    component: DiagramaBarrasComponent },
    { path: "mapa",               component: MapaComponent },

];
