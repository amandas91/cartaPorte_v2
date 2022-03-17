import { Moment } from 'moment';
export interface IPayments {
  id?: number;
  from?: string;
  to?: string;
  // checkin?: Moment;
  airline?: string;
  name_country?: string;
  status?: number;
  trip_id?: number;
  // created_at?: Moment;
  updated_at?: Moment;
  request_date?: Moment;
  starting_date?: Moment;
  ending_date?: Moment;
  due_date?: Moment;
}
export class Payments implements IPayments {
  constructor(
    public id?: number,
    public from?: string,
    public to?: string,
    public checkin?: Moment,
    public airline?: string,
    public name_country?: string,
    public status?: number,
    public trip_id?: number,
    // public created_at?: Moment,
    public updated_at?: Moment,
    public request_date?: Moment,
    public starting_date?: Moment,
    public ending_date?: Moment,
    public due_date?: Moment,
    public type?: Moment,

  ) {
    // this.editarContrasena = false;
  }
}
