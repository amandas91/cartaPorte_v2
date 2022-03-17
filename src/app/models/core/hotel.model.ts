import { Moment } from "moment";

export interface IHotel {
  id?: number;
  name?: string;
  ubication?: string;
  checkin?: Moment;
  checkout?: Moment;
  reservation_number?: string;
  nights?: number;
  pax_number?: number;
  pnr?: string;
  status?: number;
  cat_rates_id?: number;
  trip_id?: number;
  updated_at?: string;
  net_price?: string;
  total_price?: string;
  operator_commission?: string;
  microsite_commission?: string;
  agency_commission?: string;
  operator_management_commission?: string;
  manager_agency_commission?: string;
  agency_management_commission?: string;
}

export class Hotel implements IHotel {
  constructor(
    public trip_id?: number,
    public id?: number,
    public name?: string,
    public ubication?: string,
    public checkin?: Moment,
    public checkout?: Moment,
    public reservation_number?: string,
    public nights?: number,
    public pax_number?: number,
    public pnr?: string,
    public status?: number,
    public cat_rates_id?: number,
    public updated_at?: string,
    public net_price?: string,
    public total_price?: string,
    public operator_commission?: string,
    public microsite_commission?: string,
    public agency_commission?: string,
    public operator_management_commission?: string,
    public manager_agency_commission?: string,
    public agency_management_commission?: string,
    ) { 
      this.trip_id = this.trip_id || undefined;
    }
}
