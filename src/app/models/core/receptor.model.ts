export interface IReceptor {
    IdReceptor?: number;
    Rfc?: string;
    Nombre?: string;
    UsoCFDI?: string;
    CreateDate?: string;
    Serie?: string;
    Folio?: string;

  }


  export class Receptor implements IReceptor {
    constructor(
        public IdReceptor?: number,
        public Rfc?: string,
        public Nombre?: string,
        public UsoCFDI?: string,
        public CreateDate?: string,
        public Serie?: string,
        public Folio?: string,
    ) {}
  }
  