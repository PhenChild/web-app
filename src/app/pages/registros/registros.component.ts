import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Registro } from '../../modelos/registro';

@Component({
  selector: 'app-registro',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
})
export class RegistrosComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  registros: Registro[] = []

  
  dtTrigger: Subject<any> = new Subject<any>()
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.http.get('http://localhost:3000/registro/all')
      .subscribe(data => {
        this.registros = (data as any);
        this.dtTrigger.next();
      });
  }
  
  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();
  }
}
