import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin-layout/usuarios', title: 'Usuarios',  icon: 'ni-single-02 text-white', class: '' },
    { path: '/admin-layout/form-usuario', title: 'Nuevo Usuario',  icon: 'ni-badge text-white', class: '' },
    { path: '/admin-layout/estaciones', title: 'Estaciones',  icon:'ni-building text-white', class: '' },
    { path: '/admin-layout/form-estacion', title: 'Nueva Estacion',  icon: 'ni-fat-add text-white', class: '' },
    { path: '/admin-layout/variables', title: 'Variables',  icon: 'ni-collection text-white', class: '' },
    { path: '/admin-layout/form-variable', title: 'Nueva Variable',  icon: 'ni-sound-wave text-white', class: '' },
    { path: '/admin-layout/asignacion', title: 'Asignar Variables',  icon: 'ni-tag text-white', class: '' },
    { path: '/admin-layout/roles', title: 'Asignar/Editar Roles',  icon: 'ni-badge text-white', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
