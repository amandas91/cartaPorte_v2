export interface IMaterialPeligroso {
    ClaveProducto?: string;
    Descripcion?: string;
    DescripcionEmbalaje?: string;
    Embalaje?: string;
    CveMaterialPeligroso?: string;
  }

export class MaterialPeligroso implements IMaterialPeligroso {
    constructor(
        public ClaveProducto?: string,
        public Descripcion?: string,
        public DescripcionEmbalaje?: string,
        public Embalaje?: string,
        public CveMaterialPeligroso?: string,
    ) {}
  }
  
