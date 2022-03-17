import { Moment } from 'moment';
export interface IGraphics {
  month?: string[],
  data?: number[],
  type?: number,
}

export class Graphics implements IGraphics {
  constructor(
    public month?: string[],
    public total?: number[],
    public type?: number,

  ) {
  }
}