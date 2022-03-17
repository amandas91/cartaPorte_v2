export interface IExpedido {
    IdExpedido?: number;
    RFC?: string;
    Calle?: string;
    Colonia?: string;
    Municipio?: string;
    Estado?: string;
    Pais?: string;
    CodigoPostal?: string;
    CreateDate?: string;
    Estatus?: string;
    Serie?: string;
    Folio?: string;
  }

 
  
  export class Expedido implements IExpedido {
    constructor(
        public IdExpedido?: number,
        public RFC?: string,
        public Calle?: string,
        public Colonia?: string,
        public Municipio?: string,
        public Estado?: string,
        public Pais?: string,
        public CodigoPostal?: string,
        public CreateDate?: string,
        public Estatus?: string,
        public Serie?: string,
        public Folio?: string,
    ) {}
  }
  