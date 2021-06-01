import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Estacion } from '../../modelos/estacion';
import { Injectable } from '@angular/core';
import {DbService} from '../../services/database/db.service';
import { ToastrService } from "ngx-toastr";

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
    private dbService: DbService,
    private tService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(formEstacion: NgForm){
    this.dbService.addEstacion(this.estacion).subscribe(
      data => {
        this.tService.success("Estacion guardada con exito.","Envio exitoso");
        formEstacion.reset();
      },
      err => {
        this.tService.error("","Ha ocurrido un error");
        formEstacion.reset();
      }
    )
  }



}