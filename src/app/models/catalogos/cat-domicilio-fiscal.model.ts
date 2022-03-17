export interface IDomicilioFiscal {
    IdDomicilio?: number;
    Calle?: string;
    RFC?: string;
    NoExterior?: string;
    NoInterior?: string;
    Colonia?: string;
    Localidad?: string;
    Municipio?: string;
    Estado?: string;
    Pais?: string;
    CodigoPostal?: string;
    CreateDate?: string;
    Estatus?: string;
  }
  
  export class DomicilioFiscal implements IDomicilioFiscal {
    constructor(
        public IdDomicilio?: number,
        public Calle?: string,
        public RFC?: string,
        public NoExterior?: string,
        public NoInterior?: string,
        public Colonia?: string,
        public Localidad?: string,
        public Municipio?: string,
        public Estado?: string,
        public Pais?: string,
        public CodigoPostal?: string,
        public CreateDate?: string,
        public Estatus?: string,
      ) { }
  }
  
