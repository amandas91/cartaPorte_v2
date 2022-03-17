export interface IArchivoConfig {
  id?: number;
  maxSizeFile?: number;
  maxGroupFileSize?: number;
  maxGroupNumFiles?: number;
  fileExtAllow?: string;
}

export class ArchivoConfig implements IArchivoConfig {
  constructor(
    public maxSizeFile?: number,
    public maxGroupFileSize?: number,
    public maxGroupNumFiles?: number,
    public fileExtAllow?: string
  ) {}
}
