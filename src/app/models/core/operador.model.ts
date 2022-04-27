export interface IOperador {
    TipoFigura?: string;
    RFCFigura?: string;
    NumLicencia?: string;
    NombreFigura?: number;
    NumeroEmpleado?: string;
}

export class Operador implements IOperador {
  constructor(
    public TipoFigura?: string,
    public RFCFigura?: string,
    public NumLicencia?: string,
    public NombreFigura?: number,
    public NumeroEmpleado?: string,
  ) {
    
  }
}

