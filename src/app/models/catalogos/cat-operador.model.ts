export interface CatIOperador {
    NumeroEmpleado?: string;
    Nombre?: string;
    ApellidoPaterno?: string;
    ApellidoMaterno?: string;
    RFC?: string;
    NumeroLicencia?: string;
    _links?: any;
}

export class CatOperador implements CatIOperador {
  constructor(
    public NumeroEmpleado?: string,
    public Nombre?: string,
    public ApellidoPaterno?: string,
    public ApellidoMaterno?: string,
    public RFC?: string,
    public NumeroLicencia?: string,
    public _links?: any,
  ) {
    
  }
}

