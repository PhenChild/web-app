import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http"; import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ClipboardModule } from "ngx-clipboard";

import { adminLayoutRoutes } from "./admin-layout.routing";
import { DataTablesModule } from "angular-datatables";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UsuariosComponent } from "../../pages/usuarios/usuarios.component";
import { EstacionesComponent } from "../../pages/estaciones/estaciones.component";
import { VariablesComponent } from "../../pages/variables/variables.component";
import { FormUsuarioComponent } from "../../pages/form-usuario/form-usuario.component";
import { FormEstacionComponent } from "../../pages/form-estacion/form-estacion.component";
import { FormVariableComponent } from "../../pages/form-variable/form-variable.component";
import { AsignacionComponent } from "../../pages/asignacion/asignacion.component";
import { RolesComponent } from "../../pages/roles/roles.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ClipboardModule,
        DataTablesModule,
    ],
    declarations: [
        UsuariosComponent,
        EstacionesComponent,
        FormUsuarioComponent,
        FormEstacionComponent,
        VariablesComponent,
        FormVariableComponent,
        AsignacionComponent,
        RolesComponent
    ]
})

export class AdminLayoutModule {}
