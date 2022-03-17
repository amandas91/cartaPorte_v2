export interface ICatTipoProducto {
    IdTipoProducto?: number;
    ClasificacionProducto?: string;
    ClaveProducto?: string;
    CreateDate?: string;
    Descripcion?: string;
    MaterialPeligroso?: string;
  
  }
  

  export class CatTipoProducto implements ICatTipoProducto {
    constructor(
        public IdTipoProducto?: number,
        public ClasificacionProducto?: string,
        public ClaveProducto?: string,
        public CreateDate?: string,
        public Descripcion?: string,
        public MaterialPeligroso?: string,
    ) { }
  }
  