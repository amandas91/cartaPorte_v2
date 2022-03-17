export interface ICatPaises {
    IdPais?: number;
    Nombre?: string;
  
  }
  
  export class CatPaises implements ICatPaises {
    constructor(
        public IdPais?: number,
        public Nombre?: string,
    ) { }
  }
  