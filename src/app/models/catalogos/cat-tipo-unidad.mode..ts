export interface ICatTipoUnidad {
    IdTipoUnidad?: number;
    ClaveUnidad?: string;
    CreateDate?: string;
    Nombre?: string;
  }
  
  export class CatTipoUnidad implements ICatTipoUnidad {
    constructor(
        public IdTipoUnidad?: number,
        public ClaveUnidad?: string,
        public CreateDate?: string,
        public Nombre?: string,
    ) { }
  }
  