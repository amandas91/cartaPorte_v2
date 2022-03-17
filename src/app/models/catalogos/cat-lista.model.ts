export interface ICatLista {
    IdLista?: number;
    TipoLista?: string;
    Valor?: string;
    Descripcion?: string;
    Estatus?: number;
  }
  
  export class CatListaargin implements ICatLista {
    constructor(
        public IdLista?: number,
        public TipoLista?: string,
        public Valor?: string,
        public Descripcion?: string,
        public Estatus?: number,
      ) { }
  }
  