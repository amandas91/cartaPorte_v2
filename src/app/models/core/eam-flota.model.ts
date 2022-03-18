import { Moment } from 'moment';
export interface IEamFlota {

    Eco?: string ;
    AnioCP?: number ;
    PlacaCP?: string ;
    TipoPermisoCP?: string ;
    NoPermisoCP?: string ;
    ClaseVehSctCP?: string ;
    Propiedad?: string ;
    PolizaCP?: string ;
    AseguradoraCP?: string ;
    EstatusEco?: string ;
    FechaCarga?: string ;
    _links?: any ;
    status?: number ,
    message?: string,

}

export class EamFlota implements IEamFlota {
  constructor(
    public Eco?: string,
    public AnioCP?: number,
    public PlacaCP?: string,
    public TipoPermisoCP?: string,
    public NoPermisoCP?: string,
    public ClaseVehSctCP?: string,
    public Propiedad?: string,
    public PolizaCP?: string,
    public AseguradoraCP?: string,
    public EstatusEco?: string,
    public FechaCarga?: string,
    public _links?: any,
    public status?: number ,
    public message?: string,

  ) {
  }
}
