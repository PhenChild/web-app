import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Usuario } from '../../modelos/usuario';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VariablesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  variables: any;

  dtTrigger: Subject<any> = new Subject<any>()
  
  constructor(private http: HttpClient) {  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.http.get('http://localhost:3000/variable/all')
      .subscribe(data => {
        this.variables = (data as any);  
        this.dtTrigger.next();
      });
  }
  

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }
  
}
