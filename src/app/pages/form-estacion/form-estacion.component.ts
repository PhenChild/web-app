import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Estacion } from '../../modelos/estacion';
import { Injectable } from '@angular/core';
import {DbService} from '../../services/database/db.service';

@Component({
  selector: 'app-form-estacion',
  templateUrl: './form-estacion.component.html',
  styleUrls: ['./form-estacion.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class FormEstacionComponent implements OnInit {

  estacion = new Estacion();

  constructor(
    private dbService: DbService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(formEstacion: NgForm){
    this.dbService.addEstacion(this.estacion).subscribe(
      data => {
        console.log(this.estacion)
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