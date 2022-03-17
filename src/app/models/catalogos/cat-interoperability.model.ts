export interface ICatInteroperability {
  id?: number;
  name?:string;
  deleted_at?:string;
  created_at?:string;
  updated_at?:string;
}

export class CatInteroperability implements ICatInteroperability {
  constructor(
    
    public id?: number,
    public name?: string,
    public deleted_at?: string,
    public created_at?: string,
    public updated_at?: string,
  ) { }
}
