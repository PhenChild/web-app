import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UsuariosComponent } from '../../pages/usuarios/usuarios.component';
import { EstacionesComponent } from '../../pages/estaciones/estaciones.component';
import { VariablesComponent } from '../../pages/variables/variables.component';
import { FormUsuarioComponent } from '../../pages/form-usuario/form-usuario.component';
import { FormEstacionComponent } from '../../pages/form-estacion/form-estacion.component';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    DataTablesModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    UsuariosComponent,
    EstacionesComponent,
    FormUsuarioComponent,
    FormEstacionComponent,
    VariablesComponent
  ]
})

export class AdminLayoutModule {}
