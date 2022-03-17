import { Moment } from 'moment';

export interface ICliente {
    ClaveBodega?: number;
    ClaveCliente?: number;
    NombreCliente?: string;
    Estatus?: number;
    TipoPropietario?: number;
    CodigoPostal?: string;
    NombrePropietario?: string;
    DireccionCompleta?: string;
}

export class Cliente implements ICliente {
  constructor(
    public ClaveBodega?: number,
    public ClaveCliente?: number,
    public NombreCliente?: string,
    public Estatus?: number,
    public TipoPropietario?: number,
    public CodigoPostal?: string,
    public NombrePropietario?: string,
    public DireccionCompleta?: string,
  ) {
    // this.editarContrasena = false;
  }
}
