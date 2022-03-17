import { Moment } from 'moment';

export interface IArchivo {
  id?: number;
  replace?: boolean;
  name?: string;
  fileSize?: number;
  fileExt?: string;
  fileOrgName?: string;
  date?: Moment;
  path?: string;
  mimeType?: string;
  usrId?: number;
  grupo?: string;
  subGrupo?: string;
}

export class Archivo implements IArchivo {
  constructor(
    public id?: number,
    public replace?: false,
    public name?: string,
    public fileSize?: number,
    public fileExt?: string,
    public fileOrgName?: string,
    public date?: Moment,
    public path?: string,
    public mimeType?: string,
    public usrId?: number,
    public grupo?: string,
    public subGrupo?: string
  ) {
    this.replace = this.replace || false;
  }
}
