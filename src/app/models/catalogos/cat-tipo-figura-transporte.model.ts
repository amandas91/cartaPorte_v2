export interface ICatTipoFiguraTransporte {
    ClaveTransporte?: string;
    CreateDate?: string;
    Descripcion?: string;
    FechaFinVigencia?: string;
    FechaInicioVigencia?: string;
  }
  
  export class CatTipoFiguraTransporte implements ICatTipoFiguraTransporte {
    constructor(
        public ClaveTransporte?: string,
        public CreateDate?: string,
        public Descripcion?: string,
        public FechaFinVigencia?: string,
        public FechaInicioVigencia?: string,
      ) { }
  }
  