export interface ICurrency {
  id?: number;
  name?: string;
  symbol?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export class Currency implements ICurrency {
  constructor(
    public id?: number, 
    public name?: string,
    public symbol?: string,
    public created_at?: string,
    public updated_at?: string,
    public deleted_at?: string,
    ) { }
}
