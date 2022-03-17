export interface ICatMunicipios {
    IdMunicipio?: number;
    CreateDate?: string;
    Descripcion?: string;
    Municipio?: string;
    Estado?: string;
  
  }
  
  export class CatMunicipios implements ICatMunicipios {
    constructor(
        public IdMunicipio?: number,
        public CreateDate?: string,
        public Descripcion?: string,
        public Municipio?: string,
        public Estado?: string
    ) { }
  }
  