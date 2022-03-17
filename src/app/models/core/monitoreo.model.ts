export interface IMonitoreo {
    IdComprobante?: number;
    TipoComprobante?: string;
    RfcEmisor?: string;
    FechaCFDI?: string;
    UUID?: string;
    Total?: number;
    Motivo?: string;
    FolioSustitucion?: string;
    FechaCancelacion?: string;
    SerieTimbrado?: string;
    FolioTibmrado?: string;
    Referencia?: string;
    Estatus?: string;
    Error?: string;
    _links?: any;
  }

export class Monitoreo implements IMonitoreo {
    constructor(
       public IdComprobante?: number,
       public TipoComprobante?: string,
       public RfcEmisor?: string,
       public FechaCFDI?: string,
       public UUID?: string,
       public Total?: number,
       public Motivo?: string,
       public FolioSustitucion?: string,
       public FechaCancelacion?: string,
       public SerieTimbrado?: string,
       public FolioTibmrado?: string,
       public Referencia?: string,
       public Estatus?: string,
       public Error?: string,
       public _links?: any,
    ) {}
  }
  
