import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Usuario } from '../../modelos/usuario';
import {ViewEncapsulation} from '@angular/core';
import {DbService} from '../../services/database/db.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsuariosComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  usuarios: Usuario[] = [];

  dtTrigger: Subject<any> = new Subject<any>()
  constructor( private dbService: DbService) {}

  
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4
    };

    this.dbService.getUsuarios()
      .subscribe( data => {
        this.usuarios = data;
        this.dtTrigger.next();
      })
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }
  
  
}
