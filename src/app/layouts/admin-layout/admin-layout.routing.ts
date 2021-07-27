import { Routes } from "@angular/router";


import { UsuariosComponent } from "../../pages/usuarios/usuarios.component";
import { EstacionesComponent } from "../../pages/estaciones/estaciones.component";
import { FormUsuarioComponent } from "../../pages/form-usuario/form-usuario.component";
import { FormEstacionComponent } from "../../pages/form-estacion/form-estacion.component";
import { VariablesComponent } from "../../pages/variables/variables.component";
import { FormVariableComponent } from "../../pages/form-variable/form-variable.component";
import { AsignacionComponent } from "../../pages/asignacion/asignacion.component";
import { RolesComponent } from "../../pages/roles/roles.component";
import { HorariosComponent } from "../../pages/horarios/horarios.component";
import { InstrumentosComponent } from "../../pages/instrumentos/instrumentos.component";


export const adminLayoutRoutes: Routes = [
    { path: "usuarios",         component: UsuariosComponent },
    { path: "estaciones",       component: EstacionesComponent },
    { path: "variables",        component: VariablesComponent },
    { path: "form-usuario",     component: FormUsuarioComponent },
    { path: "form-estacion",    component: FormEstacionComponent },
    { path: "form-variable",    component: FormVariableComponent },
    { path: "asignacion",       component: AsignacionComponent },
    { path: "roles",            component: RolesComponent },
    { path: "horarios",         component: HorariosComponent },
    { path: "instrumentos",     component: InstrumentosComponent },
];

