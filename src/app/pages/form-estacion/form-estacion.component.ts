import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Estacion } from '../../modelos/estacion';
import { Injectable } from '@angular/core';

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
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  onSubmit(formEstacion: NgForm){
    this.http.post("http://localhost:3000/estaciones/new",this.estacion).subscribe(
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