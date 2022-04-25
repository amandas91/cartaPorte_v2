import { Moment } from 'moment';


export interface IClients {
  GeppId?: number;
  Usernam?: string;
  Role?: any;
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
  public Role?: any,
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
