import { IOperador } from "./operador.model";

export interface ICataPorte{
    Version?:string;
    TranspInternac?:string;
    TotalDistRec?:string;
    Ubicaciones?: any[];
    Mercancias?: any[];
    FiguraTransporte?: IOperador[];
    Autotransporte?: any[];
}
export class CataPorte implements ICataPorte {
  constructor(

    public Version?:string,
    public TranspInternac?:string,
    public TotalDistRec?:string,
    public Ubicaciones?: any[],
    public Mercancias?: any[],
    public FiguraTransporte?: IOperador[],
    public Autotransporte?: any[],
  ) {
    // this.editarContrasena = false;
  }
}
