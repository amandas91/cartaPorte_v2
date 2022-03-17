export interface ICatTipoRemolque {
    IdTipoRemolque?: number;
    ClaveTipoRemolque?: string;
    CreateDate?: string;
    FechaFinVigencia?: string;
    FechaIniVigencia?: string;
    Remolque?: string;
  }

  
  export class CatTipoRemolque implements ICatTipoRemolque {
    constructor(
        public IdTipoRemolque?: number,
        public ClaveTipoRemolque?: string,
        public CreateDate?: string,
        public FechaFinVigencia?: string,
        public FechaIniVigencia?: string,
        public Remolque?: string,
    ) { }
  }
  