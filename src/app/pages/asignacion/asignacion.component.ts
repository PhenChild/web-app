import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Variable } from '../../modelos/variable';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  variables: Variable[] = []
  selectedVariables: Variable[] = []
  
  dtTrigger: Subject<any> = new Subject<any>()
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.http.get('http://localhost:3000/variable/all')
      .subscribe(data => {
        this.variables = (data as any);
        this.dtTrigger.next();
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
}
