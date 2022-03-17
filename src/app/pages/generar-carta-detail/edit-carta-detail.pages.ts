import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { MonitoreoService } from 'app/services/core/monitoreo.servce';
import { AccountService } from 'app/shared/auth/account.service';
import { map } from "rxjs/operators";
import { FormBuilder, Validators } from '@angular/forms';
import { locale as english } from "app/i18n/en/trips";
import { locale as spanish } from "app/i18n/es/trips";
import { MAT_STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { ICatOwners } from "app/models/catalogos/cat-owners.model";
import { CatOrigen } from "app/shared/util/cat-origen";
import { Authority } from "app/shared/constant/authority.constants";
import { fuseAnimations } from "@fuse/animations";



const MaxItems = 2000;

export interface CargaElementTable {
  

  ClaveProdServ: string;
  ClaveUnidad: string;
  Cantidad: number;
  Unidad: string;
  Descripcion: string;
  ValorUnitario: number;
  Importe: number;
  
}

export interface UbicacionElementTable {
  rfc: string;
  fecha: string;
  direccion: string;
  cp: number;
  distancia: number;
}

export interface DomicilioFiscal {
  Calle: string;
  NoExterior: string;
  NoInterior: string;
  Colonia: string;
  Localidad: string;
  Municipio: string;
  Estado: string;
  Pais: string;
  CodigoPostal: string;
}


export interface Observaciones{
  Numero: number;
  Tema: string;
  Texto: string;
}


export interface ExpedidoEn{
  Municipio: string;
  Estado: string;
  Pais: string;
  CodigoPostal: string;
}

export interface CataPorte{
  Version?:string;
  TranspInternac?:string;
  TotalDistRec?:number;
  Ubicaciones?:any;
  Mercancias?: any;
  FiguraTransporte?: any;
  Autotransporte?: any;
}

export interface TiposFigura{
  TipoFigura?:string;
  RFCFigura?:string;
  NumLicencia?:string;
  NombreFigura?:string;
}

export interface CfdiRelacionados {
  TipoRelacion?:string;
  CfdiRelacionado?:any;
}

export interface Mercancias{
  PesoBrutoTotal?:number;
  UnidadPeso?:string;
  NumTotalMercancias?:number;
  Mercancia:any;
}

export interface Mercancia {
  BienesTransp?:string;
  Descripcion?:string;
  Cantidad?:number;
  ClaveUnidad?:string;
  Unidad?:string;
  PesoEnKg?:number;
  MaterialPeligroso?:string;
  CveMaterialPeligroso?:string;
  Embalaje?:string;
}

export interface IdentificacionVehicular{
  ConfigVehicular?:string;
  PlacaVM?:string;
  AnioModeloVM?:number;
}

export interface Seguros{
  AseguraRespCivil?:string;
  PolizaRespCivil?:string;
  AseguraMedAmbiente?:string;
  PolizaMedAmbiente?:string
}

export interface Autotransporte{
  PermSCT?:string;
  NumPermisoSCT?:string;
  IdentificacionVehicular?:IdentificacionVehicular;
  Seguros?:any;
}


@Component({
  selector: 'app-edit-carta-detail',
  templateUrl: './edit-carta-detail.pages.html',
  animations: fuseAnimations,
  styleUrls: ['./edit-carta-detail.pages.scss']
})
export class EditCartaDetailPages implements OnInit {

  isLinear = false;
  index = 0;
  nameTrip: string;

  editForm = this.fb.group({
    owner: [null, []],
    Nombre: [null, [Validators.required]],
    Rfc: [null, [Validators.required]],
    RegimenFiscal: [null, [Validators.required]],
    Pais: [null, [Validators.required]],
    Estado:[null, [Validators.required]],
    Municipio: [null, [Validators.required]],
    CodigoPostal:[null, [Validators.required]],
    RfcReceptor: [null, [Validators.required]],
    NombreReceptor: [null, []],
    UsoCFDI: [null, []],
    RFCFigura: [null, []],
    NumLicencia: [null, []],
    NombreFigura: [null, []],
    TipoFigura: [null, []],
    PermSCT:[null, [Validators.required]],
    ConfigVehicular:[null, [Validators.required]],
    NumPermisoSCT:[null, [Validators.required]],
    AnioModeloVM:[null, [Validators.required]],
    PlacaVM:[null, [Validators.required]],
    PolizaRespCivil:[null, [Validators.required]],
    AseguraRespCivil:[null, [Validators.required]],
    BienesTransp:[null, [Validators.required]],
    Descripcion:[null, [Validators.required]],
    Cantidad:[null, [Validators.required]],
    Unidad:[null, [Validators.required]],
    PesoEnKg:[null, [Validators.required]],
    IDUbicacion:[null, [Validators.required]],
    RFCRemitenteDestinatario:[null, [Validators.required]],
    TipoHorario:[null, [Validators.required]],
    PaisUbicacion:[null, [Validators.required]],
    CodigoPostalUbicacion:[null, [Validators.required]],
    EstadoUbicacion:[null, [Validators.required]],
    MunicipioUbicacion:[null, [Validators.required]],
    Correo:[null, [Validators.required]],
    DistanciaRecorrida:[null, [Validators.required]],
    Eco:[null, [Validators.required]],
    FechaSalidaLlegada:[null, [Validators.required]],
    FechaSalida:[null, [Validators.required]],
    HoraSalida:[null, [Validators.required]],
    HoraSalidaLlegada:[null, [Validators.required]],
    HoraLlegada:[null, [Validators.required]],
    ClaveBodega:[null, [Validators.required]],
    ClaveCliente:[null, [Validators.required]]
  });
  

  constructor(
    private fb: FormBuilder,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService,
    private valueService:MonitoreoService) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
        console.log('params: ', params);
        this.valueService.findMotivo('T', '00000314')
        .pipe(
            map((res: HttpResponse<any>) => {
                return res.body ? res.body : [];
            })
        )
        .subscribe((resBody: any) => (
          console.log(resBody) 
        ));
      });
  }

}
