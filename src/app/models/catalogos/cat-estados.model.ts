export interface ICatEstados {
    IdEstado?: number;
    ClaveEstado?: string;
    Nombre?: string;
    CreateDate?: string;
    IdPais?: number;
}
  
export class CatEstados implements ICatEstados {
    constructor(
        public IdEstado?: number,
        public ClaveEstado?: string,
        public Nombre?: string,
        public CreateDate?: string,
        public IdPais?: number,
    ) { }
}