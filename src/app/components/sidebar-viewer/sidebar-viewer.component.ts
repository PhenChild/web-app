import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/viewer-layout/registros', title: 'Registros',  icon: 'ni-collection text-white', class: '' },
];

@Component({
  selector: 'app-sidebar-viewer',
  templateUrl: './sidebar-viewer.component.html',
  styleUrls: ['./sidebar-viewer.component.scss']
})
export class SidebarViewerComponent implements OnInit {

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
