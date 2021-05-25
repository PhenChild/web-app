import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Estacion } from '../../modelos/estacion';
import {DbService} from '../../services/database/db.service';

@Component({
  selector: 'app-estaciones',
  templateUrl: './estaciones.component.html',
  styleUrls: ['./estaciones.component.css'],
})
export class EstacionesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  estaciones: Estacion[] =[]

  
  dtTrigger: Subject<any> = new Subject<any>()
  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.dbService.getEstaciones()
      .subscribe(data => {
        this.estaciones = (data as any);
        this.dtTrigger.next();
      });
  }
  
  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
  }
}
