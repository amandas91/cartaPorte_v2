import { Domicilio, IDomicilio } from "./domicilio.model";

export interface IUbicacion {
    TipoUbicacion?: string,
    IDUbicacion?: string,
    RFCRemitenteDestinatario?: string,
    FechaHoraSalidaLlegada?: string,
    DistanciaRecorrida?: string,
    Domicilio?: any,
}

export class Ubicacion implements IUbicacion {
  constructor(

    public TipoUbicacion?: string,
    public IDUbicacion?: string,
    public RFCRemitenteDestinatario?: string,
    public FechaHoraSalidaLlegada?: string,
    public DistanciaRecorrida?: string,
    public Domicilio?: any,

  ) {
    // this.editarContrasena = false;
  }
}
