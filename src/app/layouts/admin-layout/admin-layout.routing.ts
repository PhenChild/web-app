import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

import { UsuariosComponent } from '../../pages/usuarios/usuarios.component';
import { EstacionesComponent } from '../../pages/estaciones/estaciones.component';
import { FormUsuarioComponent } from '../../pages/form-usuario/form-usuario.component';
import { FormEstacionComponent } from '../../pages/form-estacion/form-estacion.component';
import { VariablesComponent } from '../../pages/variables/variables.component';
import { FormVariableComponent } from '../../pages/form-variable/form-variable.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'usuarios',          component: UsuariosComponent },
    { path: 'estaciones',           component: EstacionesComponent },
    { path: 'variables',           component: VariablesComponent },
    { path: 'form-usuario',           component: FormUsuarioComponent },
    { path: 'form-estacion',  component: FormEstacionComponent },
    { path: 'form-variable',  component: FormVariableComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }  
];
