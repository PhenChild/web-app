/** Clase para recibir las variables con horas. */
export class VarHora{
    /** Id de la VarHora */
    id: string;

    /** Codigo de la estacion */
    EstacionCodigo: string;

    /** Id de la variable */
    VariableId: string;

    /** Id del horario */
    HorarioId: string;

    /** Codigo del instrumento */
    InstrumentoCodigo: string;

    /** Valores de la variable */
    Variable: {
        /** Id de la variable */
        id: string;

        /** Nombre de la variable */
        nombre: string;
    };

    /** Informacion del horario */
    Horario: {
        /** Id de l horario */
        id: string;
        /** Tipo de la hora */
        tipoHora: string;

        /** Hora del horario */
        hora: string;
    };
}
