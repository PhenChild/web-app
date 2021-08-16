/** Modelo para las variables. */
export class Variable {

    /** Id de la variable. */
    id: string;

    /** Nombre de la variable */
    nombre: string;

    /** Unidad de la variable */
    unidad: string;

    /** Limite maximo de la variable. */
    maximo: number;

    /** Limite minimo de la variable */
    minimo: number;

    /** Tipo de dato de la variable */
    tipoDato: string;

    /** Descripcion de la variable */
    descripcion: string;

    /** Fecha de creacion */
    createdAt: string;

    /** Fecha de actualizacion */
    updatedAt: string;
}
