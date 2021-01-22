import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Estacion } from '../../modelos/estacion';
import { ViewEncapsulation } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/modelos/usuario';
import { NgForm} from '@angular/forms';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FormUsuarioComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  estaciones: Estacion[] = []
  selectedEstacion = new Estacion();
  usuario =  new Usuario();
  
  dtTrigger: Subject<any> = new Subject<any>()

  closeResult: string;
  constructor(private modalService: NgbModal, private http: HttpClient) { }

  open(content, type, modalDimension) {
    if (modalDimension === 'lg' && type === 'modal-large') {
      this.modalService.open(content, { windowClass: 'modal-large', size: 'lg', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return 'with: $reason';
    }
  }

  ngOnInit(): void {
    var select = document.getElementById("tipo");
    select.addEventListener("change", function () {
      let select = (<HTMLInputElement>document.getElementById("tipo")).value;
      let table = (<HTMLInputElement>document.getElementById("table-container"));
      if (select.localeCompare("Observador") == 0) {
        table.style.display = "block";
      } else if (select.localeCompare("Visualizador") == 0) {
        table.style.display = "none";
      }
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.http.get('http://localhost:3000/estaciones/all')
      .subscribe(data => {
        this.estaciones = (data as any);
        this.dtTrigger.next();
      });
  }

  selectEstacion(estacion) {
    let table = (<HTMLInputElement>document.getElementById("table-container"));
    table.style.display = "none"
    this.selectedEstacion = estacion;
    let input = (<HTMLInputElement>document.getElementById("estacion"));
    input.style.display = "block"
  }

  unselectEstacion() {
    let table = (<HTMLInputElement>document.getElementById("table-container"));
    table.style.display = "block"
    this.selectedEstacion = new Estacion();
    let input = (<HTMLInputElement>document.getElementById("estacion"));
    input.style.display = "none"
  }
  onSubmit(formEstacion: NgForm){
    this.http.post("http://localhost:3000/usuarios/new",this.usuario).subscribe(
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
