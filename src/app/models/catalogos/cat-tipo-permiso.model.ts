export interface ICatTipoPermiso {
    IdTipoPermiso?: number;
    Clave?: string;
    CreateDate?: string;
    Descripcion?: string;
  
  }
  

  export class CatTipoPermiso implements ICatTipoPermiso {
    constructor(
        public IdTipoPermiso?: number,
        public Clave?: string,
        public CreateDate?: string,
        public Descripcion?: string,
    ) { }
  }
  