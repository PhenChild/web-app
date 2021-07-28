/** Modelo para los registros. */
export class Registro {
    /** Id del registro */
    id: number;

    Observador: any;
    /** Id de la plantilla */
    VariableEstacionId: any;

    /** Valor del registro */
    valor: string;

    /** Es esditable o no */
    iseditable: boolean;

    /** Fecha de ingreso */
    fechaObservacion: Date;

    /** Fecha de creación */
    createdAt: string;

    /** Fecha de actualización. */
    updatedAt: string;
}
