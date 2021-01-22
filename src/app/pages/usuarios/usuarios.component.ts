import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Usuario } from '../../modelos/usuario';
import {ViewEncapsulation} from '@angular/core';

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
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.http.get('https://4c7be945bd33.ngrok.io/observadores/all')
      .subscribe(data => {
        this.usuarios = (data as any);
        this.dtTrigger.next();
      });
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }
  
  
}
