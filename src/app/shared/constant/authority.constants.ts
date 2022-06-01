export enum Authority {
  ADMIN = 'Admin',
  FINANZAS = 'Finanzas',
  DMC = 'DMC',
  LEISURE = 'Leisure',
  LEISURE_DMC = 'Leisure And DMC',
  AEREOS = 'Aéreos',
  ROLE_ADMIN  = 'ROLE_ADMIN', 
  ROLE_USER   = 'ROLE_USER',						
  ROLE_ADC   = 'ROLE_ADC'
}

export const ALL_ROLES: Authority[] = [
  Authority.ADMIN,
  Authority.FINANZAS,
  Authority.DMC,
  Authority.LEISURE,
  Authority.LEISURE_DMC,
  Authority.AEREOS,
  Authority.ROLE_ADMIN, 
  Authority.ROLE_USER,						
  Authority.ROLE_ADC
];


export enum Rol {
  ADMIN = 1,
  FINANZAS = 2,
  DMC = 3,
  LEISURE = 4,
  LEISURE_DMC = 5,
  AEREOS = 6,
  ROLE_ADMIN = 7, 
  ROLE_USER = 8,						
  ROLE_ADC = 9
}
