export interface IEmisor {
    IdEmisor?: number;
    Rfc?: string;
    Nombre?: string;
    RegimenFiscal?: string;
    CreateDate?: string;
    DomicilioFiscal?: any;
    ExpedidoEn?: any;
  }

 
  
  export class Emisor implements IEmisor {
    constructor(
      public IdEmisor?: number,
      public Rfc?: string,
      public Nombre?: string,
      public RegimenFiscal?: string,
      public CreateDate?: string,
      public DomicilioFiscal?: any,
      public ExpedidoEn?: any,
    ) {}
  }
  