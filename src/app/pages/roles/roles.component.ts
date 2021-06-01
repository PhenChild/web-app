import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import {DbService} from '../../services/database/db.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  usuarios: Usuario[] = [];
  
  dtTrigger: Subject<any> = new Subject<any>()
  constructor(private dbService: DbService) { }

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
