import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Estacion } from 'src/app/modelos/estacion';
import { Variable } from '../../modelos/variable';
import {DbService} from '../../services/database/db.service'

import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AsignacionComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  estaciones: Estacion[] = []
  selectedEstacion = new Estacion();
  variables: Variable[] = []
  selectedVariables: Variable[] = []
  
  dtTrigger: Subject<any> = new Subject<any>()
  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.dbService.getEstaciones()
      .subscribe(data=>{
        this.estaciones = (data as any)
        this.dtTrigger.next()
      })
      
    this.dbService.getVariables()
      .subscribe(data => {
        this.variables = (data as any);
      });
  }
  
  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
  }

  selectVariable(variable){
    this.selectedVariables.push(variable)
  }

  unselectVariable(variable){
    let index = this.selectedVariables.indexOf(variable)
    this.selectedVariables.splice(index,1)
  }

  selectEstacion(estacion){
      let tablea = (<HTMLInputElement>document.getElementById("estaciones-table"));
      tablea.style.display = "none"
      this.selectedEstacion = estacion;
      let tableb = (<HTMLInputElement>document.getElementById("variables-table"));
      tableb.style.display = ""
      //this.usuario.idEstacion = this.selectedEstacion.id;
      //this.usuario.isJefe = 1;
  }

  unselectEstacion(estacion){
    this.selectedEstacion = new Estacion();
    let tablea = (<HTMLInputElement>document.getElementById("estaciones-table"));
      tablea.style.display = ""
      this.selectedEstacion = estacion;
      let tableb = (<HTMLInputElement>document.getElementById("variables-table"));
      tableb.style.display = "none"
  }

  
}
