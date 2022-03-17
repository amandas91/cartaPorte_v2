export interface ICatOwners {
  owner?: number;
  name?: string;

}

export class CatOwners implements ICatOwners {
  constructor(
    public owner?: number,
    public name?: string
  ) { }
}
