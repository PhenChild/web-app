import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  dtTrigger: Subject<any> = new Subject<any>()
  constructor() { }

  ngOnInit(): void {
  }
  
  
}
