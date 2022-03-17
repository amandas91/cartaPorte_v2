import { Moment } from 'moment';


export interface IRfc {
  id?: number ;
  rfc?: string;
  razon_social?: string;
  address?: string;
  municipality?: string;
  postal_code?: string;
  client_id?: number;
  created_by?: Moment ;
  deleted_at?: Moment ;
  created_at?: Moment ;
  updated_at?: Moment ;
}

export class Rfc implements IRfc {
  constructor(
    public id?: number,
    public rfc?: string,
    public razon_social?: string,
    public address?: string,
    public municipality?: string,
    public postal_code?: string,
    public client_id?: number,
    public created_by?: Moment,
    public deleted_at?: Moment,
    public created_at?: Moment,
    public updated_at?: Moment,
  ) {
    // this.editarContrasena = false;
  }
}
