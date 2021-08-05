import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http"; import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ClipboardModule } from "ngx-clipboard";

import { viewerLayoutRoutes } from "./viewer-layout.routing";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


import { RegistrosComponent } from "../../pages/registros/registros.component";
import { DataTablesModule } from "angular-datatables";
import { DiagramaBarrasComponent } from "../../pages/diagrama-barras/diagrama-barras.component";
import { MapaComponent } from "../../pages/mapa/mapa.component";

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(viewerLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ClipboardModule,
        DataTablesModule,
    ],
    declarations: [
        RegistrosComponent,
        DiagramaBarrasComponent,
        MapaComponent,
    ]
})

export class ViewerLayoutModule {}
