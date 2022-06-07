import { Moment } from 'moment';


export interface IClients {
  UserId?:number;
  GeppId?: number;
  Usernam?: string;
  Role?: any;
  Password?: string;
  FirstName?: string;
  MiddleName?: string;
  LastName?: string;
  SecondLastName?: string;
  Email?: string;
  role?: string;
}

export class Clients implements IClients {
  constructor(
  public UserId?:number,
  public GeppId?: number,
  public Usernam?: string,
  public Role?: any,
  public Password?: string,
  public FirstName?: string,
  public MiddleName?: string,
  public LastName?: string,
  public SecondLastName?: string,
  public Email?: string,
  public role?: string,

  
  ) {
    // this.editarContrasena = false;
  }
}
