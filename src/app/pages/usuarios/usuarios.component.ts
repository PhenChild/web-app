import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { Usuario } from "../../modelos/usuario";
import {ViewEncapsulation} from "@angular/core";
import {DbService} from "../../services/database/db.service";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

/**
 * Componente para la pagina de usuarios.
 */
@Component({
    selector: "app-usuarios",
    templateUrl: "./usuarios.component.html",
    styleUrls: ["./usuarios.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class UsuariosComponent implements OnInit, OnDestroy {

    /** Opciones para los datatbles. */
    dtOptions: DataTables.Settings = {};

    /** Lista de usuarios*/
    usuarios: Usuario[] = [];

    /** Usuario seleccionado */
    usuario = new Usuario();

    /** Operador del datatable de los usuarios */
    dtTrigger: Subject<any> = new Subject<any>();

    /**
     * Constructor
     * @param dbService  
     * @param tService 
     */
    constructor( private dbService: DbService,
        private tService: ToastrService
    ) {}


    /**
     * Obtencion de los usuarios desde la base de datos 
     */
    ngOnInit(): void {
        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 7
        };

        this.dbService.getUsuarios()
            .subscribe( data => {
                this.usuarios = data;
                console.log(this.usuarios);
                this.dtTrigger.next();
            }, err => {
                console.log(err);
            });
    }

    /**
     * Elimina los operadores de los datatables
     */
    ngOnDestroy(): void{
        this.dtTrigger.unsubscribe();
    }

    /**
     * Edición de usuarios 
     * @param usuario usuario con datos para la actualizacion del usuario 
     */
    editarUsuario(usuario){
        this.usuario = usuario;
        this.usuario.password = "";
        const table = (<HTMLInputElement>document.getElementById("table"));
        const form = (<HTMLInputElement>document.getElementById("form-usuario"));
        table.style.display = "none";
        form.style.display = "block";
    }

    /**
     * Eliminación de usuarios
     * @param usuario usuario a eliminar 
     */
    deleteUsuario(usuario){
        this.usuario = usuario;
        this.dbService.deleteUsuario(this.usuario).subscribe(data => {
            this.tService.success("Estacion guardada con exito.", "Envio exitoso");
        },
        err => {
            this.tService.error("", "Ha ocurrido un error");
        });
    }

    /**
     * Guardado de la actualización de un usuario
     * @param formUsuario formulario de usuario 
     */
    submit(formUsuario: NgForm) {
        this.dbService.updateUsuario(this.usuario)
            .subscribe(
                data => {
                    this.tService.success("Usuario registrado con exito.", "Envio exitoso");
                    formUsuario.reset();
                },
                err => {
                    console.log(err);
                    this.tService.error("", "Ha ocurrido un error");
                    formUsuario.reset();
                }
            );
    }

    /**
     * Cancelar la actualización
     * @param formUser formulario de usuario
     */
    cancelar(formUser: NgForm){
        const table = (<HTMLInputElement>document.getElementById("table"));
        const form = (<HTMLInputElement>document.getElementById("form-usuario"));
        table.style.display = "block";
        form.style.display = "none";
        this.usuario = new Usuario();
        formUser.reset();
    }
}
