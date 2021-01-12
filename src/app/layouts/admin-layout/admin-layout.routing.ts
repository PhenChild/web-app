import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

import { UsuariosComponent } from '../../pages/usuarios/usuarios.component';
import { EstacionesComponent } from '../../pages/estaciones/estaciones.component';
import { FormUsuarioComponent } from '../../pages/form-usuario/form-usuario.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'usuarios',          component: UsuariosComponent },
    { path: 'estaciones',           component: EstacionesComponent },
    { path: 'form-usuarios',           component: FormUsuarioComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }  
];
