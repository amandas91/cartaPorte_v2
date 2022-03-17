

export interface INetClients {
  activado?: boolean;
  // adscripciones?: CatAdscripcion[];
  adscripcionesSeleccionadas?: string;
  contrasena?: string;
  correoElectronico?: string;
  editarContrasena?: boolean;
  fechaRegistro?: string;
  id?: number;
  idFiscalia?: number;
  idAgencia?: number;
  idArea?: number;
  idGrado?: number;
  idCatCargoGrado?: number;
  idRol?: number;
  nombreUsuario?: string;
  nombres?: string;
  primerApellido?: string;
  segundoApellido?: string;
  telefono?: string;
  // roles?: Role[];
  asesor?: string;
  expedientesAsignados?: number;
  coordinadorId?: number;
  especialidadId?: number;
  // especialidades?: Especialidad[];
}

export class NetClients implements INetClients {
  constructor(
    public activado?: boolean,
    // public adscripciones?: CatAdscripcion[],
    public adscripcionesSeleccionadas?: string,
    public contrasena?: string,
    public correoElectronico?: string,
    public editarContrasena?: boolean,
    public fechaRegistro?: string,
    public id?: number,
    public idArea?: number,
    public idGrado?: number,
    public idRol?: number,
    public nombreUsuario?: string,
    public nombres?: string,
    public primerApellido?: string,
    // public roles?: Role[],
    public segundoApellido?: string,
    public asesor?: string,
    public expedientesAsignados?: number,
    public coordinadorId?: number,
    public especialidadId?: number,
    // public especialidades?: Especialidad[],
  ) {
    this.editarContrasena = false;
  }
}
