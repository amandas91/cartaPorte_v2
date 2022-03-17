export interface ICatRates {
  id?: number;
  name?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export class CatRates implements ICatRates {
  constructor(
    public id?: number, 
    public name?: string,
    public description?: string,
    public created_at?: string,
    public updated_at?: string,
    ) { }
}
