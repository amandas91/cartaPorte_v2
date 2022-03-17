import { Injectable, isDevMode } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'app/shared/auth/login.service';

@Injectable({ providedIn: 'root' })
export class SharedService {
  tipoRol: any;
  tipoExpedienteIdGlobal: number;

  tipoAccion: 'create' | 'update' | 'view' = 'create';
  descTipoAccion = { create: 'Nuevo', update: 'Actualización', detail: 'Detalle' };
  idTipoAccion = { create: 'create', update: 'update', detail: 'view' };

  // Mensaje SnackBar
  tipoMensaje = { error: 'Error', aviso: 'Aviso', exito: 'Éxito' };
  duracionTipoMensaje = { error: 5000, aviso: 3000, exito: 3000 };

  // Catálogos
  catParticipaciones: any[] = [];
  catDelitos: any[] = [];
  catDelitosCes: any[] = [];
  catNacionalidades: any[] = [];
  catGeneros: any[] = [];
  catEstadoCiviles: any[] = [];
  catEscolaridades: any[] = [];
  catSituacionesJuridicas: any[] = [];
  catTipoConclusiones: any[] = [];
  catTipoExpedienteREDs: any[] = [];
  catInstitucions: any[] = [];
  catTiposEmpresa: any[] = [];
  catTipoPersonas: any[] = [];
  catTipoResoluciones: any[] = [];
  catClasificacionPersona: any[] = [];
  catTipoAudiencias: any[] = [];
  catPromociones: any[] = [];
  catDelitosSeleccionados: any[] = [];
  catAudiencias: any[] = [];
  catVictimas: any[] = [];
  catImputados: any[] = [];

  constructor(private router: Router, private authenticationService: LoginService) {
    this.log('Iniciando Operador...');
  }

  checkFieldsRequired(form: FormGroup): void {
    Object.values(form.controls).forEach(control => {
      control.markAllAsTouched();
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);

    if (this.authenticationService.logout !== undefined) this.authenticationService.logout();
  }

  initCatalogos(res: any): void {
    this.log('Inicializando catálogos');
    this.catParticipaciones = res.catParticipaciones;
    this.catDelitosCes = res.catDelitosCes;
    this.catNacionalidades = res.catNacionalidades;
    this.catDelitos = res.catDelitos;
    this.catGeneros = res.catGeneros;
    this.catEstadoCiviles = res.catEstadoCiviles;
    this.catEscolaridades = res.catEscolaridades;
    this.catSituacionesJuridicas = res.catSituacionesJuridicas;
    this.catTipoConclusiones = res.catTipoConclusiones;
    this.catTipoExpedienteREDs = res.catTipoExpedienteREDs;
    this.catInstitucions = res.catInstitucions;
    this.catTiposEmpresa = res.catTiposEmpresa;
    this.catTipoPersonas = res.catTipoPersonas;
    this.catTipoResoluciones = res.catTipoResoluciones;
    this.catClasificacionPersona = res.catClasificacionPersona;
    this.catTipoAudiencias = res.catTipoAudiencias;
    this.log('Catálogos: ', res);
  }

  log(...arg: any[]): void {
    if (isDevMode()) {
      console.log(arg);
    }
  }

  errorHandl = (errorResponse: HttpErrorResponse) => {
    this.log(errorResponse);

    if (errorResponse.error.error === 'invalid_token') {
      this.goToLogin();
      return throwError('invalid_token');
    } else {
      let errorMessage = [];
      if (errorResponse.error instanceof ErrorEvent || errorResponse.status === 500) {
        errorMessage.push({ code: errorResponse.status, message: errorResponse.error.errorMessage });
      } else {
        errorMessage.push({ code: errorResponse.status, message: errorResponse.message });
      }
      this.log(errorMessage[0]);
      return throwError(errorMessage[0]);
    }
  };
}
