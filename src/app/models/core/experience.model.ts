import { Moment } from "moment";
export interface IExperience {

  id?: number;
  reservation_number?: string;
  checkin?: Moment;
  from?: string;
  to?: string;
  company?: string;
  status?: number;
  trip_id?: number;
  created_at?: Moment;
  updated_at?: Moment;
  net_price?: string;
  total_price?: string;
  operator_commission?: string;
  microsite_commission?: string;
  agency_commission?: string;
  operator_management_commission?: string;
  manager_agency_commission?: string;
  agency_management_commission?: string;

}
export class Experience implements IExperience {
  constructor(

    public id?: number,
    public reservation_number?: string,
    public checkin?: Moment,
    public from?: string,
    public to?: string,
    public company?: string,
    public status?: number,
    public trip_id?: number,
    public created_at?: Moment,
    public updated_at?: Moment,
    public net_price?: string,
    public total_price?: string,
    public operator_commission?: string,
    public microsite_commission?: string,
    public agency_commission?: string,
    public operator_management_commission?: string,
    public manager_agency_commission?: string,
    public agency_management_commission?: string,
  ) { }
}
