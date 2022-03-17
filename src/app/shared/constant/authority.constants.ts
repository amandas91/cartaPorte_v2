export enum Authority {
  ADMIN = 'Admin',
  FINANZAS = 'Finanzas',
  DMC = 'DMC',
  LEISURE = 'Leisure',
  LEISURE_DMC = 'Leisure And DMC',
  AEREOS = 'Aéreos'
}

export const ALL_ROLES: Authority[] = [
  Authority.ADMIN,
  Authority.FINANZAS,
  Authority.DMC,
  Authority.LEISURE,
  Authority.LEISURE_DMC,
  Authority.AEREOS
];


export enum Rol {
  ADMIN = 1,
  FINANZAS = 2,
  DMC = 3,
  LEISURE = 4,
  LEISURE_DMC = 5,
  AEREOS = 6
}
