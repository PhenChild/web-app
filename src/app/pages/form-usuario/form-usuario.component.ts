import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { Estacion } from '../../modelos/estacion';
import { ViewEncapsulation } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from 'src/app/modelos/usuario';
import { NgForm } from '@angular/forms';
import { DbService } from '../../services/database/db.service';

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
  usuario = new Usuario();

  dtTrigger: Subject<any> = new Subject<any>()

  closeResult: string;
  constructor(
    private modalService: NgbModal,
    private dbService: DbService,
    private tService: ToastrService
  ) { }

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
    /*
    select.addEventListener("change", function () {
      let select = (<HTMLInputElement>document.getElementById("tipo")).value;
      let table = (<HTMLInputElement>document.getElementById("table-container"));
      if (select.localeCompare("Observador") == 0) {
        table.style.display = "block";
      } else if (select.localeCompare("Visualizador") == 0) {
        table.style.display = "none";
      }
    });*/

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.dbService.getEstaciones()
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
    //this.usuario.idEstacion = this.selectedEstacion.id;
    //this.usuario.isJefe = 1;
  }

  unselectEstacion() {
    let table = (<HTMLInputElement>document.getElementById("table-container"));
    table.style.display = "block"
    this.selectedEstacion = new Estacion();
    let input = (<HTMLInputElement>document.getElementById("estacion"));
    input.style.display = "none"
  }
  onSubmit(formUsuario: NgForm) {
    this.dbService.addUsuario(this.usuario)
      .subscribe(
        data => {
          this.tService.success("Usuario registrado con exito.", "Envio exitoso");
          formUsuario.reset();
        },
        err => {
          console.log(err)
          this.tService.error("", "Ha ocurrido un error");
          formUsuario.reset();
        }
      )
  }
}
