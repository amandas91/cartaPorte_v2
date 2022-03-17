export interface ICatMargin {
  id?: number;
  name?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export class CatMargin implements ICatMargin {
  constructor(
    public id?: number, 
    public name?: string,
    public description?: string,
    public created_at?: string,
    public updated_at?: string,
    ) { }
}
