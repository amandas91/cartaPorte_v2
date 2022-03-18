export interface ICatPaises {
    IdPais?: string;
    Nombre?: string;
  
  }
  
  export class CatPaises implements ICatPaises {
    constructor(
        public IdPais?: string,
        public Nombre?: string,
    ) { }
  }
  