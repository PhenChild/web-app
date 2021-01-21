import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  dtOptions: Datatables.Settings = {};
  usuarios: Usuario[] = [];

  dtTrigger: Subject<any> = new Subject<any>()
  constructor() { }

  ngOnInit(): void {
  }
  
  
}
