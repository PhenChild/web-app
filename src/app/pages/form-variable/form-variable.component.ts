import { Component, OnInit } from '@angular/core';
import { Variable } from '../../modelos/variable';
import { NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(formEstacion: NgForm){
    this.http.post("http://localhost:3000/varibales/new",this.variable).subscribe(
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
