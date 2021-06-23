/** Modelo para los registros. */
export class Registro {
    /** Id del registro */
    idValor: number;

    /** Id de la plantilla */
    idPlantilla: number;

    /** Valor del registro */
    valor: string;

    /** Es esditable o no */
    iseditable: boolean;

    /** Fecha de ingreso */
    fecha: string;

    /** Latitud */
    lat: number;

    /** Longitud */
    lon: number;

    /** Fecha de creación */
    createdAt: string;

    /** Fecha de actualización. */
    updatedAt: string;
}
