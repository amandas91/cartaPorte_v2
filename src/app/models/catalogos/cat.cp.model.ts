export interface ICatCP {
    IdCP?: number;
    CodigoPostal?: string;
    Estado?: string;
    EstadoFronterizo?: string;
    FechaFinVigencia?: string;
    FechaInicioVigencia?: string;
    Localidad?: string;
    Municipio?: string;
    CreateDate?: string;
  }
  
  export class CatCP implements ICatCP {
    constructor(
      public IdCP?: number,
      public CodigoPostal?: string,
      public Estado?: string,
      public EstadoFronterizo?: string,
      public FechaFinVigencia?: string,
      public FechaInicioVigencia?: string,
      public Localidad?: string,
      public Municipio?: string,
      public CreateDate?: string,
      ) { }
  }
  