import { Component, OnInit } from '@angular/core';
import { Variable } from '../../modelos/variable';
import { NgForm} from '@angular/forms';
import { Injectable } from '@angular/core';
import {DbService} from '../../services/database/db.service';

@Component({
  selector: 'app-form-variable',
  templateUrl: './form-variable.component.html',
  styleUrls: ['./form-variable.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class FormVariableComponent implements OnInit {

  variable= new Variable();
  
  constructor( 
    private dbService: DbService) { }

  ngOnInit(): void {
  }

  onSubmit(formEstacion: NgForm){
    this.dbService.addVariable(this.variable)
    .subscribe(
      data => {
        console.log("enviado")
        //this.showNotification();
      },
      err => {
        console.log("Errorrr")
        console.log(err)
      }
    )

  }



}
