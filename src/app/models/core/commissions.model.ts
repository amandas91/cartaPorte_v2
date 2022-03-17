import { Moment } from 'moment';
export interface ICommissions {

    id?: number ;
    amount_org?: string ;
    currency?: string ;
    type_deposit?: number ;
    amount?: number ;
    cat_deposit_id?: number ;
    trip_id?: number ;
    deleted_at?: Moment ;
    created_at?: Moment ;
    updated_at?: Moment ;

}

export class Commissions implements ICommissions {
  constructor(

    public id?: number,
    public amount_org?: string,
    public currency?: string,
    public type_deposit?: number,
    public amount?: number,
    public cat_deposit_id?: number,
    public trip_id?: number,
    public deleted_at?: Moment,
    public created_at?: Moment,
    public updated_at?: Moment,

  ) {
    // this.editarContrasena = false;
  }
}
