import { Moment } from 'moment';
export interface IConcepto {

    ClaveProdServ?: string ;
    Cantidad?: number ;
    ClaveUnidad?: string ;
    Unidad?: string ;
    Descripcion?: string ;
    ValorUnitario?: number ;
    Importe?: number ;

}

export class Concepto implements IConcepto {
  constructor(

    public ClaveProdServ?: string ,
    public Cantidad?: number ,
    public ClaveUnidad?: string ,
    public Unidad?: string,
    public Descripcion?: string,
    public ValorUnitario?: number,
    public Importe?: number,

  ) {
    // this.editarContrasena = false;
  }
}
