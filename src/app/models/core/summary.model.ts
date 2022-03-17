import { Moment } from 'moment';
export interface ISummary {
  id?: number,
  starting_date?: Moment,
  ending_date?: Moment,
  owner?: string,
  name?: string,
  adventures?: number[]
}export class Summary implements ISummary {
  constructor(

    public id?: number,
    public starting_date?: Moment,
    public ending_date?: Moment,
    public owner?: string,
    public name?: string,
    public adventures?: number[],


  ) {
    // this.editarContrasena = false;
  }
}
