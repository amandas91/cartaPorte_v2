import { Moment } from 'moment';
export interface IData {
  month?: string,
  total?: number
}

export class Data implements IData {
  constructor(
    public month?: string,
    public total?: number

  ) {
  }
}
