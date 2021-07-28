import { Routes } from "@angular/router";


import { RegistrosComponent } from "../../pages/registros/registros.component";
import { DiagramaBarrasComponent } from "../../pages/diagrama-barras/diagrama-barras.component";



export const viewerLayoutRoutes: Routes = [
    { path: "registros",          component: RegistrosComponent },
    { path: "diagrama-barras",    component: DiagramaBarrasComponent },

];
