import { Moment } from 'moment';


export interface IClients {
  id?: number;
  name?: string;
  second_name?: string;
  last_name_father?: string;
  last_name_mother?: string;
  email?: string;
  deleted_at?: Moment;
  created_at?: Moment;
  updated_at?: Moment;
}

export class Clients implements IClients {
  constructor(
    public id?: number,
    public name?: string,
    public second_name?: string,
    public last_name_father?: string,
    public last_name_mother?: string,
    public email?: string,
    public deleted_at?: Moment,
    public created_at?: Moment,
    public updated_at?: Moment,
  ) {
    // this.editarContrasena = false;
  }
}
