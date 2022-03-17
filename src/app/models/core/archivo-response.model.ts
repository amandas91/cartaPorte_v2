import { IArchivo } from './archivo.model';
import { IResponseErrorMessage } from './response-error-message.model';

export interface IArchivoResponse {
  error?: boolean;
  errorMsg?: IResponseErrorMessage;
  archivo?: IArchivo;
}

export class ArchivoResponse implements IArchivoResponse {
  constructor(public error?: boolean, public errorMsg?: IResponseErrorMessage, public archivo?: IArchivo) {
    this.error = this.error || false;
  }
}
