import { ICataPorte } from './carta-porte.model';
import { IConcepto } from './concepto.model';
import { IEmisor } from './emisor.model';
import { IReceptor } from './receptor.model';
export interface IGenerarCata {
    VersionGepp?:string;
    Version?:string;
    Serie?:string;
    Folio?:string;
    Fecha?:string;
    FormaPago?:string;
    SubTotal?:number;
    Moneda?:string;
    Total?:number;
    TipoDeComprobante?:string;
    LugarExpedicion?:string;
    CfdiRelacionados?: any;
    Emisor?: IEmisor;
    Receptor?: any;
    Conceptos?: Array<IConcepto>;
    Observaciones?: any;
    CartaPorte?: any;
    Correos?: any;

}
export class GenerarCata implements IGenerarCata {
  constructor(

    public VersionGepp?:string,
    public Version?:string,
    public Serie?:string,
    public Folio?:string,
    public Fecha?:string,
    public FormaPago?:string,
    public SubTotal?:number,
    public Moneda?:string,
    public Total?:number,
    public TipoDeComprobante?:string,
    public LugarExpedicion?:string,
    public CfdiRelacionados?: any,
    public Emisor?: IEmisor,
    public Receptor?: any,
    public Conceptos?:Array<IConcepto>,
    public Observaciones?: any,
    public CartaPorte?: any,
    public Correos?: any,


  ) {
    // this.editarContrasena = false;
  }
}
