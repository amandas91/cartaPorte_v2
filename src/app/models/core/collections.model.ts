import { Moment } from 'moment';
export interface ICollections {

  amount?: number;
  cat_rates_id?: number;
  created_by?: number;
  currency_id?: string;
  description?: string;
  id?: number;
  owner?: string;
  record?: string;
  reference?: string;
  starting_date?: Moment;
  status?: string;
  type?: string;
  checkin?: Moment;
  created_at?: Moment;
  due_date?: Moment;

}
export class Collections implements ICollections {
  constructor(
    public amount?: number,
    public cat_rates_id?: number,
    public created_by?: number,
    public currency_id?: string,
    public description?: string,
    public id?: number,
    public owner?: string,
    public record?: string,
    public reference?: string,
    public starting_date?: Moment,
    public status?: string,
    public type?: string,
    public checkin?: Moment,
    public created_at?: Moment,
    public due_date?: Moment,
  ) {
    // this.editarContrasena = false;
  }
}
