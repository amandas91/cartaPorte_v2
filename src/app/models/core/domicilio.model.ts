import { Moment } from "moment";
export interface IDomicilio {

  id?: string;
  Colonia?: string;
  Localidad?: string;
  Municipio?: string;
  Estado?: string;
  Pais?: number;
  CodigoPostal?: string;
}
export class Domicilio implements IDomicilio {
  constructor(
    public id?: string,
    public Colonia?: string,
    public Localidad?: string,
    public Municipio?: string,
    public Estado?: string,
    public Pais?: number,
    public CodigoPostal?: string,

  ) {

  }
}
