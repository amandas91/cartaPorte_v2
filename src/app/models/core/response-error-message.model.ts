export interface IResponseErrorMessage {
  message?: string;
  code?: string;
}

export class ResponseErrorMessage implements IResponseErrorMessage {
  constructor(public message?: string, public code?: string) {}
}
