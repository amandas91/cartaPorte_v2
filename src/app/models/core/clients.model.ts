import { Moment } from 'moment';


export interface IClients {
  GeppId?: number;
  Usernam?: string;
  Role?: string;
  Password?: string;
  FirstName?: string;
  MiddleName?: string;
  LastName?: string;
  SecondLastName?: string;
  Email?: string;
}

export class Clients implements IClients {
  constructor(
  public GeppId?: number,
  public Usernam?: string,
  public Role?: string,
  public Password?: string,
  public FirstName?: string,
  public MiddleName?: string,
  public LastName?: string,
  public SecondLastName?: string,
  public Email?: string,
  ) {
    // this.editarContrasena = false;
  }
}
