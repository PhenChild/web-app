export class VarHora{
    id: string;
    EstacionCodigo: string;
    VariableId: string;
    HorarioId: string;
    InstrumentoCodigo: string;
    Variable: {
        id: string;
        nombre: string;
    };
    Horario: {
        id: string;
        tipoHora: string;
        hora: string;
    };
}
