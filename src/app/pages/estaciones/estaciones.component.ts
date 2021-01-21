import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Estacion } from '../../modelos/estacion';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styleUrls: ['./estaciones.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EstacionesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  estaciones: Estacion[] =[]

  
  dtTrigger: Subject<any> = new Subject<any>()
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.http.get('http://localhost:3000/estaciones/all')
      .subscribe(data => {
        this.estaciones = (data as any);
        this.dtTrigger.next();
      });
  }

}
