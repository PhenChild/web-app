/** Instrumento de medicion para una estacion. */
export class Instrumento {
    /** Codigo del instrumento */
    codigo: string;

    /** Nombre del instrumento. */
    nombre: string;

    /** Estacion a la que pertenece el instrumento */
    estacion: string;

    /** Estado del instrumento */
    estado: boolean;
}
