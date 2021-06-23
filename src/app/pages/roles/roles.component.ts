import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../modelos/usuario";
import { DbService } from "../../services/database/db.service";
import { Subject } from "rxjs";
import { Estacion } from "../../modelos/estacion";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";


/**
 * Componente para la página de asignación de roles a los usuarios.
 */
@Component({
    selector: "app-roles",
    templateUrl: "./roles.component.html",
    styleUrls: ["./roles.component.css"]
})
export class RolesComponent implements OnInit {

    /**
     * Opciones de los datatables.
     */
    dtOptions: DataTables.Settings = {};

    /**
     * Lista de usuarios
     */
    usuarios: Usuario[] = [];

    /**
     * Lista de estaciones
     */
    estaciones: Estacion[] = [];

    /**
     * Estacion selecionada.
     */
    selectedEstacion = new Estacion();

    /**
     * Usuario Seleccionado.
     */
    selectedUser = new Usuario();

    /**
     * Operador de la tabla de usuarios.
     */
    dtTrigger1: Subject<any> = new Subject();


    /**
     * Operador de la tabla de estaciones.
     */
    dtTrigger2: Subject<any> = new Subject();

    /**
     * Constructor
     * @param dbService Conexion a la base
     * @param tService Servicio de notificaciones
     */
    constructor(
        private dbService: DbService,
        private tService: ToastrService
    ) { }

    /**
     * Llena las tablas de usuarios y estaciones. Agrega el evento en caso de que
     * sea administrador, no se muestre la tabla de estaciones.
     */
    ngOnInit(): void {
        const select = document.getElementById("rol");

        select.addEventListener("change", function () {
            const val = (<HTMLInputElement>document.getElementById("rol")).value;
            const checkbox = (<HTMLInputElement>document.getElementById("checkboxEsPrincipal"));
            const table = (<HTMLInputElement>document.getElementById("table-container"));
            const estacion = (<HTMLInputElement>document.getElementById("text-estacion"));
            if (val.localeCompare("observer") === 0) {
                table.style.display = "block";
                checkbox.style.display = "block";
            } else if (val.localeCompare("admin") === 0) {
                table.style.display = "none";
                checkbox.style.display = "none";
                estacion.style.display = "none";
            }
        });

        this.dtOptions = {
            pagingType: "full_numbers",
            pageLength: 4
        };

        this.dbService.getUsuarios()
            .subscribe(data => {
                this.usuarios = data;
                this.dtTrigger1.next();
            });
        this.dbService.getEstaciones()
            .subscribe(data => {
                this.estaciones = (data as any);
                this.dtTrigger2.next();
            });
    }

    /**
     * Elimina los operadores de los datatables.
     */
    ngOnDestroy(): void {
        this.dtTrigger1.unsubscribe();
        this.dtTrigger2.unsubscribe();
    }

    /**
     * Selecciona el usuario para asignarle un rol.
     * @param usuario Usuario seleccionado.
     */
    selectUsuario(usuario: Usuario): void {
        const table = (<HTMLInputElement>document.getElementById("usuarios-table"));
        table.style.display = "none";
        this.selectedUser = usuario;
        const form = (<HTMLInputElement>document.getElementById("rol-form"));
        form.style.display = "";
        // this.usuario.idEstacion = this.selectedEstacion.id;
        // this.usuario.isJefe = 1;
    }

    /**
     * Deselecciona el usuario escojido para escoger otro.
     */
    unselectUsuario(): void {
        this.selectedUser = new Usuario();
        const form = (<HTMLInputElement>document.getElementById("rol-form"));
        form.style.display = "none";
        const table = (<HTMLInputElement>document.getElementById("usuarios-table"));
        table.style.display = "";
    }

    /**
     * Selecciona una estación a la que pertenecer el nuevo observador.
     * @param estacion Estacion escojida.
     */
    selectEstacion(estacion: Estacion): void {
        const table = (<HTMLInputElement>document.getElementById("table-container"));
        table.style.display = "none";
        this.selectedEstacion = estacion;
        const input = (<HTMLInputElement>document.getElementById("text-estacion"));
        input.style.display = "block";
    }

    /**
     * Deselecciona una estacion, para seleccionar otra para el observador.
     */
    unselectEstacion(): void {
        this.selectedEstacion = new Estacion();
        const table = (<HTMLInputElement>document.getElementById("table-container"));
        table.style.display = "block";
        const input = (<HTMLInputElement>document.getElementById("text-estacion"));
        input.style.display = "none";
    }

    /**
     * Guarda los cambios en el rol del usuario.
     * @param formRol Formulario de asignación de rol.
     */
    onSubmit(formRol: NgForm): void {
        const rol = (<HTMLInputElement>document.getElementById("rol")).value;
        const estacion = this.selectedEstacion.codigo;
        if ((rol.localeCompare("observer") === 0) && this.selectedEstacion.codigo == null){
            this.tService.error("Falta seleccionar estación.", "Necesita seleccionar una estación.");
        }else{
            console.log(this.selectedUser.id);
            console.log(rol);
            console.log(estacion);
            this.dbService.asignarRol({
                usuario: this.selectedUser.id,
                role: rol,
                estacion: estacion,
            }).subscribe(
                data => {
                    this.tService.success("Usuario registrado con exito.", "Envio exitoso");
                    formRol.reset();
                    this.unselectEstacion();
                    this.unselectUsuario();
                },
                err => {
                    console.log(err);
                    this.tService.error("", "Ha ocurrido un error");
                    formRol.reset();
                    this.unselectEstacion();
                    this.unselectUsuario();
                }
            );
        }
    }

    /**
     * Cancela el formulario de asignación.
     */
    cancelar(): void{
        this.unselectEstacion();
        this.unselectUsuario();
    }
}
