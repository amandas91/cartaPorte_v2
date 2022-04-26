import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from "@fuse/animations";
import { ICatEstados } from "app/models/catalogos/cat-estados.model";
import { ICatMunicipios } from "app/models/catalogos/cat-municipios.model";
import { ICatOwners } from "app/models/catalogos/cat-owners.model";
import { ICatPaises } from "app/models/catalogos/cat-paises.model";
import { ICatTipoFiguraTransporte } from "app/models/catalogos/cat-tipo-figura-transporte.model";
import { ICatTipoPermiso } from "app/models/catalogos/cat-tipo-permiso.model";
import { ICatTipoProducto } from "app/models/catalogos/cat-tipo-producto.model";
import { ICatTipoRemolque } from "app/models/catalogos/cat-tipo-remolque.model";
import { ICatTipoUnidad } from "app/models/catalogos/cat-tipo-unidad.mode.";
import { ICatCP } from "app/models/catalogos/cat.cp.model";
import { IConcepto } from "app/models/core/concepto.model";
import { IEamFlota } from "app/models/core/eam-flota.model";
import { Emisor, IEmisor } from "app/models/core/emisor.model";
import { IReceptor, Receptor } from "app/models/core/receptor.model";
import { CatCPService } from "app/services/catalogos/cap-cp.service";
import { CatEstadosService } from "app/services/catalogos/cat-estados.service";
import { CatMunicipiosService } from "app/services/catalogos/cat-municipios.service";
import { CatPaisesService } from "app/services/catalogos/cat-paises.service";
import { CatTipoFiguraTransporteService } from "app/services/catalogos/cat-tipo-figura-transporte.service";
import { CatTipoPermisoService } from "app/services/catalogos/cat-tipo-permiso.service";
import { CatTipoProductoService } from "app/services/catalogos/cat-tipo-producto.service";
import { CatTipoRemolqueService } from "app/services/catalogos/cat-tipo-remolque.service";
import { CatTipoUnidadService } from "app/services/catalogos/cat-tipo-unidad.service";
import { EamFlotaService } from "app/services/core/eam-flota.service";
import { EmisorService } from "app/services/core/emisor.service";
import { ReceptorService } from "app/services/core/receptor.service";
import { AccountService } from "app/shared/auth/account.service";
import { Authority } from "app/shared/constant/authority.constants";
import { map } from "rxjs/operators";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import Swal from "sweetalert2";
import { GenerarCata, IGenerarCata } from "app/models/core/generar-carta.model";
import { GenerarCartaService } from "app/services/core/generar-carta.service";
import { Observable } from 'rxjs';
import { ICatLista } from "app/models/catalogos/cat-lista.model";
import { ListaService } from "app/services/catalogos/cat-listas.service";
import { Operador } from "app/models/core/operador.model";
import { ICliente } from "app/models/core/cliente.model";
import { ClienteService } from "app/services/core/cliente.service";
import { Domicilio } from "app/models/core/domicilio.model";
import { IMaterialPeligroso } from "app/models/core/material-peligroso.model";
import { MaterialPeligrosoService } from "app/services/core/material-peligroso.service";
import { DatePipe } from '@angular/common';
import { DomicilioFiscalService } from "app/services/core/domicilio-fiscal";
import { IDomicilioFiscal } from "app/models/catalogos/cat-domicilio-fiscal.model";
import { ActivatedRoute } from "@angular/router";
import { MonitoreoService } from "app/services/core/monitoreo.servce";

import { MatDialog } from "@angular/material/dialog";
import { ImportExcelPages } from "app/pages/import-excel/import-excel.pages";
import { CatOperadorService } from "app/services/catalogos/cat-operador.service";
import { CatIOperador } from "app/models/catalogos/cat-operador.model";

import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';

import { LoginService } from "app/shared/auth/login.service";
import { Router } from '@angular/router';



const MaxItems = 2000;

export interface CargaElementTable {
  ClaveProdServ: string;
  TipoProducto: string;
  ClaveUnidad: string;
  Cantidad: number;
  Unidad: string;
  Descripcion: string;
  ValorUnitario: number;
  Importe: number;
  carga: any;
  PesoEnKg: number;
  PesoBruto: number;

}

export interface UbicacionElementTable {
  rfc: string;
  fecha: string;
  direccion: string;
  cp: number;
  distancia: number;
  ubicacion: any;
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


export interface Observaciones {
  Numero: number;
  Tema: string;
  Texto: string;
}


export interface ExpedidoEn {
  Calle: string;
  Colonia: string;
  Municipio: string;
  Estado: string;
  Pais: string;
  CodigoPostal: string;
}

export interface CataPorte {
  Version?: string;
  TranspInternac?: string;
  TotalDistRec?: number;
  Ubicaciones?: any;
  Mercancias?: any;
  FiguraTransporte?: any;
  Autotransporte?: any;
  ClaveBodega?: any;
  ClaveCliente?: any;
}

export interface TiposFigura {
  TipoFigura?: string;
  RFCFigura?: string;
  NumLicencia?: string;
  NombreFigura?: string;
}

export interface CfdiRelacionados {
  TipoRelacion?: string;
  CfdiRelacionado?: any;
}

export interface Mercancias {
  PesoBrutoTotal?: number;
  UnidadPeso?: string;
  NumTotalMercancias?: number;
  Mercancia: any;
}

export interface Mercancia {
  BienesTransp?: string;
  Descripcion?: string;
  Cantidad?: number;
  ClaveUnidad?: string;
  Unidad?: string;
  PesoEnKg?: number;
  MaterialPeligroso?: string;
  CveMaterialPeligroso?: string;
  Embalaje?: string;
}

export interface IdentificacionVehicular {
  ConfigVehicular?: string;
  PlacaVM?: string;
  AnioModeloVM?: number;
}

export interface Seguros {
  AseguraRespCivil?: string;
  PolizaRespCivil?: string;
  AseguraMedAmbiente?: string;
  PolizaMedAmbiente?: string
}

export interface Autotransporte {
  PermSCT?: string;
  NumPermisoSCT?: string;
  eco?: string;
  IdentificacionVehicular?: IdentificacionVehicular;
  Seguros?: any;
}


@Component({
  selector: 'app-generar-carta-detail',
  templateUrl: './generar-carta-detail.page.html',
  animations: fuseAnimations

})
export class GenerarCartaDetailPage implements OnInit, AfterViewInit {
  datepipe: DatePipe = new DatePipe('en-US')
  editForm: FormGroup;
  isLinear = false;
  index = 0;
  LugarExpedicion: string;
  FechaActual: string;
  catOwners: ICatOwners[];
  catPaises: ICatPaises[];
  catEstados: ICatEstados[];
  catMunicipios: ICatMunicipios[];
  catCP: ICatCP[];
  catTipoUnidad: ICatTipoUnidad[];
  catTipoFiguraTransporte: ICatTipoFiguraTransporte[];
  catTipoPermiso: ICatTipoPermiso[];
  catTipoRemolque: ICatTipoRemolque[];
  catTipoProducto: ICatTipoProducto[];
  tipoProducto: ICatTipoProducto[];
  tipoHorario: ICatLista[];
  eamFlota: IEamFlota[];
  cliente: ICliente[];
  statusFlota = false;
  messageFlota: string;
  cargaElementList: CargaElementTable;

  cargaMercancias: Mercancias;
  cargaMercancia: Mercancia;
  ubicacionElementList: UbicacionElementTable;

  operador = new Operador;
  generarCarta = new GenerarCata;
  generarCartaUpdate = new GenerarCata;
  CartaPorte: CataPorte;

  Mercancias: Mercancias[];
  materialPeligroso: IMaterialPeligroso[];
  domicilio = new Domicilio;
  emisor_g = new Emisor;
  receptor_g = new Receptor;
  DomicilioFiscal: DomicilioFiscal;
  domFiscal: IDomicilioFiscal[];
  ExpedidoEn: ExpedidoEn;
  Observaciones: Observaciones[];
  TiposFigura: any;
  CfdiRelacionados: CfdiRelacionados;
  IdentificacionVehicular: IdentificacionVehicular;
  Autotransporte: Autotransporte;
  Seguros: Seguros;


  emisor: IEmisor[];
  receptor: IReceptor[];

  concepto: IConcepto[];
  conceptos: Array<IConcepto> = [];

  Ubicaciones: [];
  ubicacionOrigen: Array<any> = [];
  ubicacionDestino: Array<any> = [];
  mercancia: Array<any> = [];
  ubicaciontest: any;

  localidad: string;
  clave_estado: string;

  PesoBrutoTotal = 0;

  ClaveProdServ: string;
  descripcion: string;
  ClaveUnidad: string;
  MaterialPeligroso: string;
  CveMaterialPeligroso: string;
  Embalaje: string;

  displayedColumns: string[] = ['Linea', 'ClaveProdServ', 'Descripcion', 'Cantidad', 'Unidad', 'PesoEnKg', 'PesoBruto', 'action'];
  displayedColumns1: string[] = ['index', 'rfc', 'fecha', 'direccion', 'cp', 'distancia', 'action'];
  //# Linea	Tipo de Producto	Descripción	Cantidad	Tipo unidad	Peso por Unidad (Kg)	Peso Bruto (Kg)	Accion
  dataSource = [];
  dataSourceUbication = [];

  isSaving = false;

  totalDistancia: number = 0;

  paisExpedido: string;
  estadoExpedido: string;
  municipioExpedido: string;
  cpExpedido: string;

  paisUbicacion: any;
  estadoUbicacion: string;
  municipioUbicacion: string;
  cpUbicacion: string;

  Unidad: string;

  conceptoUnidad: string;
  conceptoClaveUnidad: string;

  NumTotalMercancias: number = 0;
  PermSCT: string;


  calleTest: any[];

  folio: string = "";
  serie: string = "";

  origen: boolean = false;

  tipoProductoTable: string;

  searchArray: any;
  searchRfc: any;
  validacionUbicacion: any;

  isEdit: boolean;
  generarCartaPorteUpdate: any;

  municipioTempUbicacion: any;

  Eco: any;
  searchBodega: any;

  @Output()
  auxSave: EventEmitter<boolean> = new EventEmitter();

  @Input()
  parentForm?: FormGroup;

  @Input()
  bodegatSelect?: any;

  @Output()
  formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  ELEMENT_DATA: UbicacionElementTable[] = [];
  dataSource1 = new MatTableDataSource(this.ELEMENT_DATA);

  showDetailDestino: boolean = false;
  showDetailOrigen: boolean = false;

  //dataSource1: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatTable) table: MatTable<CargaElementTable>;
  @ViewChild(MatTable) tableUbicacion: MatTable<UbicacionElementTable>;
  emisorTemp: { CreateDate: string; IdEmisor: number; Nombre: string; RegimenFiscal: string; Rfc: string; };
  validacionCarga: string;
  cpEmisorValidate: string;
  pesoBruto = 0;
  estadoUbicacionTem: any;
  NombreCliente: any;
  NombrePropietario: any;

  constructor(
    private fb: FormBuilder,
    private catPaisesService: CatPaisesService,
    private catEstadosService: CatEstadosService,
    private catMunicipiosService: CatMunicipiosService,
    private catCPsService: CatCPService,
    private catTipoUnidadService: CatTipoUnidadService,
    private emisorService: EmisorService,
    private receptorService: ReceptorService,
    private catTipoFiguraTransporteService: CatTipoFiguraTransporteService,
    private catTipoPermisoService: CatTipoPermisoService,
    private catTipoRemolqueService: CatTipoRemolqueService,
    private catTipoProductoService: CatTipoProductoService,
    private catTipoListaService: ListaService,
    private eamFlotaService: EamFlotaService,
    private clienteService: ClienteService,
    protected accountService: AccountService,
    private _liveAnnouncer: LiveAnnouncer,
    private generarCartaService: GenerarCartaService,
    private materialPeligrosoService: MaterialPeligrosoService,
    private domicilioFiscalService: DomicilioFiscalService,
    protected activatedRoute: ActivatedRoute,
    private monitorService: MonitoreoService,
    private dialog: MatDialog,
    private catOperadorService: CatOperadorService,
    private localStorage: LocalStorageService,
    private loginService: LoginService,
    protected router: Router

  ) {
    this.createForm();
    this.dataSource = [];
  }

  createForm() {
    this.editForm = this.fb.group({
      Nombre: [null, [Validators.required]],
      bodega: [null, [Validators.required]],
      Rfc: [null, [Validators.required]],
      RegimenFiscal: [null, [Validators.required]],
      Pais: [null, []],
      Estado: [null, []],
      Municipio: [null, []],
      CodigoPostal: [null, []],
      RfcReceptor: [null, [Validators.required,
      Validators.maxLength(13),
      Validators.minLength(13)
      ]],
      NombreReceptor: [null, []],
      UsoCFDI: [null, []],
      RFCFigura: [{value: '', disabled: true}, [Validators.required,
      Validators.maxLength(13),
      Validators.minLength(13)
      ]],
      NumLicencia: [{value: '', disabled: true}, [Validators.required]],
      NombreFigura: [{value: '', disabled: true}, [Validators.required]],
      TipoFigura: [null, [Validators.required]],
      PermSCT: [null, [Validators.required]],
      ConfigVehicular: [null, [Validators.required]],
      NumPermisoSCT: [null, [Validators.required]],
      AnioModeloVM: [null, [Validators.required]],
      PlacaVM: [null, [Validators.required]],
      PolizaRespCivil: [null, [Validators.required]],
      AseguraRespCivil: [null, [Validators.required]],
      BienesTransp: [null, []],
      Descripcion: [null, []],
      Cantidad: [null, []],
      Unidad: [null, []],
      PesoEnKg: [null, []],
      IDUbicacion: [null, []],
      RFCRemitenteDestinatario: [null, [Validators.required]],
      RFCDestino: [null, [Validators.required]],
      TipoHorario: [null, []],
      PaisUbicacion: [null, []],
      CodigoPostalUbicacion: [null, []],
      EstadoUbicacion: [null, []],
      MunicipioUbicacion: [null, []],
      Correo: [null, [Validators.required]],
      DistanciaRecorrida: [null, []],
      Eco: [null, []],
      FechaSalidaLlegada: [null, []],
      FechaSalida: [null, []],
      HoraSalida: [null, []],
      HoraSalidaLlegada: [null, []],
      HoraLlegada: [null, []],
      ClaveBodega: [null, []],
      ClaveCliente: [null, []],
      NumeroEmpleado: [null, [Validators.required]],
    });

    this.editForm.controls['CodigoPostal'].valueChanges.subscribe(data => {
      console.log(data);
      var regexp = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
      var isValid = regexp.test(data);
      if (isValid) {
        this.cpEmisorValidate = ""
      } else {
        this.cpEmisorValidate = "Formato CP no valido"
      }
    });
    this.editForm.controls['RFCRemitenteDestinatario'].setValue("XAXX010101000")
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource1.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  ngOnInit(): void {
    let fechaActual = Math.floor(Date.now()/1000);
    let fechaExpired = Date.parse(this.localStorage.retrieve('ExpirationDate')) /1000
    if(fechaActual  >= fechaExpired ){
      this.loginService.logout()
      this.localStorage.clear('authenticationToken')
      this.localStorage.clear('Username');
      this.localStorage.clear('UserId');
      this.localStorage.clear('ExpirationDate');
      this.localStorage.clear('Verified');
      sessionStorage.removeItem('authenticationToken')
      sessionStorage.removeItem('Username')
      sessionStorage.removeItem('UserId')
      sessionStorage.removeItem('ExpirationDate')
      sessionStorage.removeItem('Verified')
      this.router.navigate(['/login']);
    }else{
      this.cargaServicios()
    }
  }


  cargaServicios(){
    this.activatedRoute.params.subscribe(params => {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      this.FechaActual = this.datepipe.transform(Date.now(), 'yyyy-MM-ddTh:mm:ss');
      console.log('params: ', params);
      if (params.excel) {
        this.importItem()
      }
      this.emisorService
        .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1))
        .pipe(
          map((res: HttpResponse<IEmisor[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEmisor[]) => (this.emisor = resBody));


      this.receptorService
        .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1))
        .pipe(
          map((res: HttpResponse<IReceptor[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IReceptor[]) => (this.receptor = resBody));



      this.catPaisesService
        .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1))
        .pipe(
          map((res: HttpResponse<ICatPaises[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICatPaises[]) => (this.catPaises = resBody));

      this.catTipoUnidadService
        .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1))
        .pipe(
          map((res: HttpResponse<ICatTipoUnidad[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICatTipoUnidad[]) => (this.catTipoUnidad = resBody));


      this.catTipoPermisoService
        .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1))
        .pipe(
          map((res: HttpResponse<ICatTipoPermiso[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICatTipoPermiso[]) => (this.catTipoPermiso = resBody));

      this.catTipoRemolqueService
        .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1))
        .pipe(
          map((res: HttpResponse<ICatTipoRemolque[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICatTipoRemolque[]) => (this.catTipoRemolque = resBody));

      this.catTipoProductoService
        .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1))
        .pipe(
          map((res: HttpResponse<ICatTipoProducto[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICatTipoProducto[]) => (

          this.catTipoProducto = resBody

        ));

      this.catTipoListaService.query({ size: MaxItems }, "TIPO_HORARIO")
        .pipe(
          map((res: HttpResponse<ICatLista[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICatLista[]) => (
          this.tipoHorario = resBody

        ));

      this.catTipoFiguraTransporteService
        .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1))
        .pipe(
          map((res: HttpResponse<ICatTipoFiguraTransporte[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICatTipoFiguraTransporte[]) => (
          this.catTipoFiguraTransporte = resBody,
          this.editForm.controls['TipoFigura'].setValue(resBody[2].ClaveTransporte),
          this.editForm.controls['TipoFigura'].disable()
        ));


      this.serie = params.id;
      this.folio = params.id;

      // console.log("AQUI");
      // console.log(params.folio);
      if (params.folio) {
        this.isEdit = true;
        this.monitorService.findMotivo('T', params.folio)
          .pipe(
            map((res: HttpResponse<any>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBody: any) => (
            this.update(resBody)
            //this.generarCartaPorteUpdate = resBody

          ))

      } else {
        this.isEdit = false;
        Swal.close()
      }

    });
  }


  update(resBody) {
    this.generarCarta = resBody,
      console.log("Consulta de Carta")
    console.log(this.generarCarta)
    this.totalDistancia = 0

    /**
     * Llenando Tabla de Carga
     */

    resBody.CartaPorte.Mercancias.Mercancia.forEach(value => {

      this.cargaMercancia = {
        BienesTransp: value.BienesTransp,
        Cantidad: value.Cantidad,
        Unidad: value.Unidad,
        Descripcion: value.Descripcion,
        ClaveUnidad: value.ClaveUnidad,
        PesoEnKg: Number(value.PesoEnKg),
        MaterialPeligroso: value.MaterialPeligroso,
        CveMaterialPeligroso: value.MaterialPeligroso,
        Embalaje: value.Embalaje,
      };



      this.cargaElementList = {
        ClaveProdServ: value.BienesTransp,
        TipoProducto: value.ClaveUnidad,//this.tipoProductoTable,
        Cantidad: value.Cantidad,
        ClaveUnidad: value.ClaveUnidad,
        Unidad: value.Unidad,
        Descripcion: value.Descripcion,
        ValorUnitario: 0,
        Importe: 0,
        carga: this.cargaMercancia,
        PesoEnKg: Number(value.PesoEnKg),
        PesoBruto: Number(value.PesoEnKg) * Number(value.Cantidad)
      };


      this.PesoBrutoTotal += Number(value.PesoEnKg) * Number(value.Cantidad)
      this.NumTotalMercancias += Number(value.Cantidad);
      //this.dataSource = resBody.Conceptos;
      //this.dataSource = resBody.CartaPorte.Mercancias
      this.dataSource.push(this.cargaElementList)
      this.table.renderRows()

    })


    /**
     * Llenando Tabla de Carga
     */

    /**
    * Llenando Tabla de Ubicacion 
    */
    /*
    * ORIGEN
    */
    this.editForm.controls['bodega'].setValue(resBody.CartaPorte.Ubicaciones.Ubicacion[0].BodegaCedis)
    this.editForm.controls['FechaSalida'].setValue(resBody.CartaPorte.Ubicaciones.Ubicacion[0].FechaHoraSalidaLlegada)
    let tmpTime = this.editForm.controls['FechaSalida'].value;
    let formattedDate = this.datepipe.transform(tmpTime, 'hh:mm')
    this.editForm.controls['HoraSalida'].setValue(formattedDate)
    this.editForm.controls['RFCRemitenteDestinatario'].setValue(resBody.CartaPorte.Ubicaciones.Ubicacion[0].RFCRemitenteDestinatario)
    this.editForm.controls['TipoHorario'].setValue(this.tipoHorario[0].Descripcion)

    resBody.CartaPorte.Ubicaciones.Ubicacion.forEach(element => {
      let auxubicacionElementList: any;

      let auxdomicilio = {
        CodigoPostal: element.Domicilio.CodigoPostal,
        Colonia: element.Domicilio.Colonia,
        Estado: element.Domicilio.Estado,
        Localidad: element.Domicilio.Localidad,
        Municipio: element.Domicilio.CodMunicipioigoPostal,
        Pais: element.Domicilio.Pais
      }

      let aux = {
        TipoUbicacion: element.TipoUbicacion,
        RFCRemitenteDestinatario: element.RFCRemitenteDestinatario,
        IDUbicacion: element.IDUbicacion,
        FechaHoraSalidaLlegada: element.FechaHoraSalidaLlegada,
        DistanciaRecorrida: this.round(element.DistanciaRecorrida),
        Domicilio: auxdomicilio
      };

      auxubicacionElementList = {
        rfc: element.RFCRemitenteDestinatario,
        fecha: element.FechaHoraSalidaLlegada,
        direccion: element.Domicilio.Estado,
        cp: element.Domicilio.CodigoPostal,
        distancia: this.round(element.DistanciaRecorrida)
      }


      this.totalDistancia += this.round(Number(element.DistanciaRecorrida))

      this.ubicacionDestino.push(aux);

      if (element.TipoUbicacion == "Destino")
        this.dataSource1.data.push(auxubicacionElementList);

    })


    //this.dataSource1.data = resBody.CartaPorte.Ubicaciones.Ubicacion;
    this.dataSource1.sort = this.sort;

    //Emisor
    this.searchRfc = this.generarCarta.Emisor.Rfc;
    this.searchArray = this.emisor.findIndex(x => x.Rfc === this.searchRfc),
      this.editForm.controls['Rfc'].setValue(this.emisor[this.searchArray]),
      this.editForm.controls['Nombre'].setValue(this.generarCarta.Emisor.Nombre),
      this.editForm.controls['RegimenFiscal'].setValue(this.generarCarta.Emisor.RegimenFiscal),
      this.editForm.controls['CodigoPostal'].setValue(this.generarCarta.Emisor.DomicilioFiscal.CodigoPostal),
      this.emisor_g.Rfc = this.generarCarta.Emisor.Rfc,
      this.emisor_g.Nombre = this.generarCarta.Emisor.Nombre
    this.emisor_g.RegimenFiscal = this.generarCarta.Emisor.RegimenFiscal

    this.DomicilioFiscal = this.generarCarta.Emisor.DomicilioFiscal;

    //EXPEDIDO


    //PAIS
    this.searchRfc = this.generarCarta.Emisor.DomicilioFiscal.Pais,
      this.searchArray = this.catPaises.findIndex(x => x.IdPais === this.searchRfc),
      this.editForm.controls['Pais'].setValue(this.catPaises[0]),
      this.paisExpedido = this.catPaises[0].IdPais,
      this.LugarExpedicion = this.editForm.controls['CodigoPostal'].value,

      //estado
      this.catEstadosService.find(this.searchRfc)
        .pipe(
          map((res: HttpResponse<ICatEstados[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICatEstados[]) => (
          this.catEstados = resBody,
          this.searchRfc = this.generarCarta.Emisor.DomicilioFiscal.Estado,
          this.searchArray = this.catEstados.findIndex(x => x.Nombre === this.searchRfc),
          this.editForm.controls['Estado'].setValue(this.catEstados[this.searchArray]),
          this.estadoExpedido = this.catEstados[this.searchArray].ClaveEstado,

          //MUNICIPIO
          this.searchRfc = this.generarCarta.Emisor.DomicilioFiscal.Municipio,
          this.catMunicipiosService.find(this.searchRfc)
            .pipe(
              map((res: HttpResponse<ICatMunicipios[]>) => {
                return res.body ? res.body : [];
              })
            )
            .subscribe((resBody: ICatMunicipios[]) => (
              this.catMunicipios = resBody,

              this.searchArray = this.catMunicipios.findIndex(x => x.Descripcion === this.searchRfc),
              this.editForm.controls['Municipio'].setValue(this.catMunicipios[this.searchArray]),
              this.municipioExpedido = this.catMunicipios[this.searchArray].Municipio

            ))
        ))


    //Receptor
      this.editForm.controls['RfcReceptor'].setValue(this.generarCarta.Receptor.Rfc),
      this.editForm.controls['NombreReceptor'].setValue(this.generarCarta.Receptor.Nombre),
      this.editForm.controls['UsoCFDI'].setValue(this.generarCarta.Receptor.UsoCFDI),
      this.receptor_g = this.generarCarta.Receptor,
      //Operador
      this.editForm.controls['NumeroEmpleado'].setValue(this.generarCarta.CartaPorte.FiguraTransporte.TiposFigura[0].NumeroEmpleado),
      this.editForm.controls['RFCFigura'].setValue(this.generarCarta.CartaPorte.FiguraTransporte.TiposFigura[0].RFCFigura),
      this.editForm.controls['NumLicencia'].setValue(this.generarCarta.CartaPorte.FiguraTransporte.TiposFigura[0].NumLicencia),
      this.editForm.controls['TipoFigura'].setValue(this.generarCarta.CartaPorte.FiguraTransporte.TiposFigura[0].TipoFigura),
      this.editForm.controls['NombreFigura'].setValue(this.generarCarta.CartaPorte.FiguraTransporte.TiposFigura[0].NombreFigura),

      //Unidad y Transporte
      // this.editForm.controls['ClaveBodega'].setValue(this.generarCarta.CartaPorte.ClaveBodega),
      // this.editForm.controls['ClaveCliente'].setValue(this.generarCarta.CartaPorte.ClaveCliente),
      this.editForm.controls['Eco'].setValue(this.generarCarta.CartaPorte.Mercancias.Autotransporte.eco),
      this.Eco = this.generarCarta.CartaPorte.Mercancias.Autotransporte.eco,
      this.PermSCT = this.generarCarta.CartaPorte.Mercancias.Autotransporte.PermSCT;
    this.editForm.controls['PermSCT'].setValue(this.generarCarta.CartaPorte.Mercancias.Autotransporte.PermSCT),
      this.editForm.controls['AnioModeloVM'].setValue(this.generarCarta.CartaPorte.Mercancias.Autotransporte.IdentificacionVehicular.AnioModeloVM),
      this.editForm.controls['PlacaVM'].setValue(this.generarCarta.CartaPorte.Mercancias.Autotransporte.IdentificacionVehicular.PlacaVM),
      this.editForm.controls['ConfigVehicular'].setValue(this.generarCarta.CartaPorte.Mercancias.Autotransporte.IdentificacionVehicular.ConfigVehicular),
      this.editForm.controls['Eco'].setValue(this.generarCarta.CartaPorte.Mercancias.Autotransporte.eco),
      this.editForm.controls['NumPermisoSCT'].setValue(this.generarCarta.CartaPorte.Mercancias.Autotransporte.NumPermisoSCT),
      this.editForm.controls['PolizaRespCivil'].setValue(this.generarCarta.CartaPorte.Mercancias.Autotransporte.Seguros.PolizaRespCivil),
      this.editForm.controls['AseguraRespCivil'].setValue(this.generarCarta.CartaPorte.Mercancias.Autotransporte.Seguros.AseguraRespCivil),

      //METODO DE ENVIO 

      this.editForm.controls['Correo'].setValue(this.generarCarta.MetodoEnvio.Email),
      //this.searchRfc = this.generarCarta.CartaPorte.Mercancias.Autotransporte.PermSCT;
      //this.searchArray = this.catTipoPermiso.findIndex(x => x.Clave ===  this.searchRfc),
      //this.editForm.controls['PermSCT'].setValue(this.catTipoPermiso[this.searchArray]),

      //this.searchRfc = this.generarCarta.CartaPorte.Mercancias.Autotransporte.IdentificacionVehicular.ConfigVehicular;
      // this.searchArray = this.catTipoRemolque.findIndex(x => x.ClaveNomenclatura ===  this.searchRfc),
      //this.editForm.controls['ConfigVehicular'].setValue(this.catTipoRemolque[1]),


      Swal.close()
  }


  round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }


  addData() {
    if (this.editForm.controls['PesoEnKg'].value == null || Number(this.editForm.controls['PesoEnKg'].value) <= 0
      || this.editForm.controls['Cantidad'].value == null || Number(this.editForm.controls['Cantidad'].value) <= 0
      || this.Unidad == undefined || this.descripcion == undefined || this.ClaveProdServ == undefined) {

      this.validacionCarga = " * Error al agregar ubicacion, por favor valide los campos"

    } else {



      this.NumTotalMercancias += Number(this.editForm.controls['Cantidad'].value);

      var pesoBrutoPoducto = 0;

      pesoBrutoPoducto += Number(this.editForm.controls['PesoEnKg'].value) * Number(this.editForm.controls['Cantidad'].value);
      this.PesoBrutoTotal += Number(pesoBrutoPoducto);
      this.cargaMercancia = {
        BienesTransp: "" + this.ClaveProdServ,
        Cantidad: parseInt(this.editForm.controls['Cantidad'].value),
        Unidad: this.Unidad,
        Descripcion: this.descripcion,
        ClaveUnidad: this.ClaveUnidad,
        PesoEnKg: parseInt(this.editForm.controls['PesoEnKg'].value),
        MaterialPeligroso: this.MaterialPeligroso,
        CveMaterialPeligroso: this.CveMaterialPeligroso,
        Embalaje: this.Embalaje,
      };



      this.cargaElementList = {
        ClaveProdServ: "" + this.ClaveProdServ,
        TipoProducto: this.tipoProductoTable,
        Cantidad: Number(this.editForm.controls['Cantidad'].value),
        ClaveUnidad: this.ClaveUnidad,
        Unidad: this.Unidad,
        Descripcion: this.descripcion,
        ValorUnitario: 0,
        Importe: 0,
        carga: this.cargaMercancia,
        PesoEnKg: parseInt(this.editForm.controls['PesoEnKg'].value),
        PesoBruto: pesoBrutoPoducto
      };


      this.dataSource.push(this.cargaElementList);
      this.table.renderRows();

    }
  }

  deleteRowData(index, element) {
    const data = this.dataSource;
    console.log(data);
    data.splice(index, 1);

    this.dataSource = data;

    this.table.renderRows();
    this.NumTotalMercancias = 0;
    this.PesoBrutoTotal = 0;
    this.dataSource.forEach(element => {
      this.NumTotalMercancias += Number(element.Cantidad)
      this.PesoBrutoTotal += Number(element.PesoBruto)
    })

  }


  addDataUbicacion() {
    if (this.editForm.controls['CodigoPostalUbicacion'].value == null || this.editForm.controls['CodigoPostalUbicacion'].value.length <= 4 || this.editForm.controls['DistanciaRecorrida'].value == null
      || Number(this.editForm.controls['DistanciaRecorrida'].value) <= 0 || this.editForm.controls['FechaSalidaLlegada'].value == null || this.editForm.controls['HoraLlegada'].value == null
      || this.editForm.controls['RFCDestino'].value == null || this.paisUbicacion == undefined || this.municipioUbicacion == undefined || this.estadoUbicacion == undefined) {

      console.log("length: ", this.editForm.controls['CodigoPostalUbicacion'].value.length)

      this.validacionUbicacion = " * Error al agregar ubicacion, por favor valide los campos"

    } else {

      this.validacionUbicacion = ""


      this.domicilio.Pais = this.paisUbicacion;
      this.domicilio.Municipio = this.municipioUbicacion;
      this.domicilio.Estado = this.estadoUbicacion;
      this.domicilio.CodigoPostal = this.editForm.controls['CodigoPostalUbicacion'].value;

      if (this.origen == false) {

        let tmpDate = this.editForm.controls['FechaSalida'].value;
        let tmpTime = this.editForm.controls['HoraSalida'].value;

        let formattedDate = this.datepipe.transform(tmpDate, 'YYYY-MM-dd') + 'T' + tmpTime + ':00';
        let aux = {
          TipoUbicacion: "Origen",
          RFCRemitenteDestinatario: this.editForm.controls['RFCRemitenteDestinatario'].value.toUpperCase(),
          IDUbicacion: 0,
          FechaHoraSalidaLlegada: formattedDate,
          DistanciaRecorrida: null,
          Domicilio: this.domicilio
        };

        this.ubicacionOrigen.push(aux);
        this.origen = true;
        // console.log("AGREGAR ORIGEN");
        // console.log(this.ubicacionOrigen);
      }else{
        let tmpDate = this.editForm.controls['FechaSalidaLlegada'].value;
        let tmpTime = this.editForm.controls['HoraLlegada'].value;
        let formattedDate = this.datepipe.transform(tmpDate, 'YYYY-MM-dd') + 'T' + tmpTime + ':00';
  
        let aux = {
          TipoUbicacion: "Destino",
          RFCRemitenteDestinatario: this.editForm.controls['RFCDestino'].value.toUpperCase(),
          IDUbicacion: 0,
          FechaHoraSalidaLlegada: formattedDate,
          DistanciaRecorrida: this.round(Number(this.editForm.controls['DistanciaRecorrida'].value)),
          Domicilio: this.domicilio
        };

        this.ubicacionElementList = {
          rfc: this.editForm.controls['RFCDestino'].value,
          fecha: formattedDate,
          direccion: this.domicilio.Estado,
          cp: this.editForm.controls['CodigoPostalUbicacion'].value,
          distancia: this.round(this.editForm.controls['DistanciaRecorrida'].value),
          ubicacion: aux
        };
  
        this.totalDistancia += this.round(Number(this.editForm.controls['DistanciaRecorrida'].value))
  
        this.ubicacionDestino.push(aux);
        this.dataSource1.data.push(this.ubicacionElementList);
        this.dataSource1.sort = this.sort;
        // console.log("AGREGAR Destino");
        // console.log(this.ubicacionDestino);
        this.editForm.controls['DistanciaRecorrida'].setValue('');
        this.editForm.controls['PaisUbicacion'].setValue('');
        this.editForm.controls['EstadoUbicacion'].setValue('');
        this.editForm.controls['MunicipioUbicacion'].setValue('');
        this.editForm.controls['CodigoPostalUbicacion'].setValue('');

      }

      
    }
  }

  removeDataUbicacion(index, element) {
    const data = this.dataSource1.data;

    data.splice(index, 1);

    this.dataSource1.data = data;

    this.ubicacionDestino.splice(index, 1);


    this.table.renderRows();
    this.totalDistancia = 0;
    this.dataSource1.data.forEach(element => {
      console.log(element)
      this.totalDistancia += this.round(Number(element.distancia))
    })

  }

  onSelectEvent(value: any, type: string) {
    switch (type) {
      case "expedicion":
        this.datepipe.transform(Date.now(), 'yyyy-MM-ddThh:mm:ss');
        this.LugarExpedicion = this.editForm.controls['CodigoPostal'].value;
        break;
      case "eamFlota":
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...',
        });
        Swal.showLoading();


        this.eamFlotaService.find(this.editForm.controls['Eco'].value)
          .pipe(
            map((res: HttpResponse<IEamFlota>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBody: IEamFlota) => {
            if (!resBody.status) {
              if (resBody.EstatusEco == 'ACTIVO') {
                this.editForm.controls['AnioModeloVM'].setValue(resBody.AnioCP)
                this.editForm.controls['PlacaVM'].setValue(resBody.PlacaCP)
                this.editForm.controls['PolizaRespCivil'].setValue(resBody.PolizaCP)
                this.editForm.controls['AseguraRespCivil'].setValue(resBody.AseguradoraCP)
                this.editForm.controls['NumPermisoSCT'].setValue(resBody.NoPermisoCP)
                this.editForm.controls['PermSCT'].setValue(resBody.TipoPermisoCP)
                this.editForm.controls['ConfigVehicular'].setValue(resBody.ClaseVehSctCP)
                this.Eco = this.editForm.controls['Eco'].value
                this.PermSCT = this.editForm.controls['PermSCT'].value
                //Disable
                this.editForm.controls['AnioModeloVM'].enable()
                this.editForm.controls['PlacaVM'].enable()
                this.editForm.controls['PolizaRespCivil'].enable()
                this.editForm.controls['AseguraRespCivil'].enable()
                this.editForm.controls['NumPermisoSCT'].enable()
                this.editForm.controls['PermSCT'].enable()
                this.editForm.controls['ConfigVehicular'].enable()
                this.editForm.controls['PermSCT'].enable()
                Swal.close();
              } else if (resBody.EstatusEco != 'ACTIVO') {
                Swal.fire({
                  title: 'No se pudo realizar la acción',
                  text: resBody.EstatusEco,
                  icon: 'warning',
                  showCloseButton: true,
                });

              } else {
                Swal.fire({
                  title: 'No se pudo realizar la acción',
                  text: resBody.message,
                  icon: 'warning',
                  showCloseButton: true,
                });

              }
            } else {
              Swal.fire({
                title: 'No se pudo realizar la acción',
                text: resBody.message,
                icon: 'warning',
                showCloseButton: true,
              });
            }

          });


        break;
      case "pais":
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...',
        });
        Swal.showLoading();

        this.catEstadosService.find(value.IdPais)
          .pipe(
            map((res: HttpResponse<ICatEstados[]>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBody: ICatEstados[]) => (
            this.paisExpedido = value.IdPais,
            this.catEstados = resBody,
            Swal.close()));
        break;
      case "estado":
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...',
        });
        Swal.showLoading();
        this.estadoExpedido = value.ClaveEstado;
        this.catMunicipiosService.find(value.Nombre)
          .pipe(
            map((res: HttpResponse<ICatMunicipios[]>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBody: ICatMunicipios[]) => (this.catMunicipios = resBody,
            Swal.close()));
        break;
      case "municipio":
        this.municipioExpedido = value.Municipio;
        break;
      case "paisUbicacion":
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...',
        });
        Swal.showLoading();
        //this.paisUbicacion = value.Nombre;
        this.paisUbicacion = value.IdPais;
        this.catEstadosService.find(value.IdPais)
          .pipe(
            map((res: HttpResponse<ICatEstados[]>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBody: ICatEstados[]) => (this.catEstados = resBody,
            Swal.close()));
        break;
      case "estadoUbicacion":
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...',
        });
        Swal.showLoading();
        this.estadoUbicacion = value.ClaveEstado;
        this.catMunicipiosService.find(value.Nombre)
          .pipe(
            map((res: HttpResponse<ICatMunicipios[]>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBody: ICatMunicipios[]) => (this.catMunicipios = resBody,
            Swal.close()));
        break;
      case "municipioUbicacion":
        this.municipioUbicacion = value.Municipio;
        break;
      case "rfcemisor":
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...',
        });
        Swal.showLoading();
        this.editForm.controls['Nombre'].setValue(value.Nombre);
        this.editForm.controls['RegimenFiscal'].setValue(value.RegimenFiscal);
        this.emisor_g = this.editForm.controls['Rfc'].value;

        /**
         * RECEPTOR
         */
         this.editForm.controls['RfcReceptor'].setValue(value.Rfc);
         this.editForm.controls['NombreReceptor'].setValue(value.Nombre);
         this.editForm.controls['UsoCFDI'].setValue("P01");
         this.editForm.controls['RfcReceptor'].disable()
         this.editForm.controls['NombreReceptor'].disable();
         this.editForm.controls['UsoCFDI'].disable();

         ////////////////

         this.receptor_g.Rfc = value.Rfc;
         this.receptor_g.Nombre = value.Nombre;
         this.receptor_g.UsoCFDI = "P01";
         this.generarCarta.Receptor = this.receptor_g;

         
        this.domicilioFiscalService.findDomicilioFiscal(value.Rfc)
          .pipe(
            map((res: HttpResponse<IDomicilioFiscal[]>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBody: IDomicilioFiscal[]) => (
            this.domFiscal = resBody,

            this.DomicilioFiscal = {
              Calle: '',
              NoExterior: this.domFiscal[0].NoExterior,
              NoInterior: this.domFiscal[0].NoInterior,
              Colonia: this.domFiscal[0].Colonia,
              Localidad: this.domFiscal[0].Localidad,
              Municipio: this.domFiscal[0].Municipio,
              Estado: this.domFiscal[0].Estado,
              Pais: this.domFiscal[0].Pais,
              CodigoPostal: this.domFiscal[0].CodigoPostal,
            }


          ));


        // this.receptorService
        //   .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1))
        //   .pipe(
        //     map((res: HttpResponse<IReceptor[]>) => {
        //       return res.body ? res.body : [];
        //     })
        //   )
        //   .subscribe((resBody: IReceptor[]) => (this.receptor = resBody));



        Swal.close()
        break;
      case "rfcreceptor":

        //this.editForm.controls['RfcReceptor'].setValue(value.Rfc);
        this.editForm.controls['NombreReceptor'].setValue(value.Nombre);
        this.editForm.controls['UsoCFDI'].setValue(value.UsoCFDI);

        this.receptor_g.Rfc = value.Rfc;
        this.receptor_g.Nombre = value.Nombre;
        this.receptor_g.UsoCFDI = value.UsoCFDI;
        this.generarCarta.Receptor = this.receptor_g;

        this.DomicilioFiscal = {
          Calle: '',
          NoExterior: this.domFiscal[0].NoExterior,
          NoInterior: this.domFiscal[0].NoInterior,
          Colonia: this.domFiscal[0].Colonia,
          Localidad: this.domFiscal[0].Localidad,
          Municipio: this.domFiscal[0].Municipio,
          Estado: this.domFiscal[0].Estado,
          Pais: this.domFiscal[0].Pais,
          CodigoPostal: this.domFiscal[0].CodigoPostal,

        };

        break;
      case "clavecliente":
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...',
        });
        Swal.showLoading();
        this.clienteService.find(this.editForm.controls['ClaveBodega'].value, this.editForm.controls['ClaveCliente'].value)
          .pipe(
            map((res: HttpResponse<any>) => {
              return res.body ? res.body : [];

            })
          )
          .subscribe((resBody: any) => {
            if (resBody.Estatus == 1) {
              this.municipioTempUbicacion = resBody.Municipio,
                this.estadoUbicacionTem = resBody.Estado,
                this.NombreCliente = resBody.NombreCliente,
                this.NombrePropietario = resBody.NombrePropietario,
                this.editForm.controls['RFCDestino'].setValue(this.emisor_g.Rfc),
                this.editForm.controls['RFCRemitenteDestinatario'].setValue("XAXX010101000"),
                this.editForm.controls['PaisUbicacion'].setValue(this.catPaises[0]),
                this.paisUbicacion = this.catPaises[0].IdPais;
              this.editForm.controls['CodigoPostalUbicacion'].setValue(resBody.CodigoPostal),
                //estado
                this.catEstadosService.find("MEX")
                  .pipe(
                    map((res: HttpResponse<ICatEstados[]>) => {
                      return res.body ? res.body : [];
                    })
                  )
                  .subscribe((resBody: ICatEstados[]) => {

                    this.catEstados = resBody
                    if (this.estadoUbicacionTem != undefined) {

                      this.searchArray = this.catEstados.findIndex(x => x.Nombre === this.estadoUbicacionTem)

                      this.estadoUbicacion = this.catEstados[this.searchArray].ClaveEstado != undefined ? this.catEstados[this.searchArray].ClaveEstado : ""
                    }
                    this.editForm.controls['EstadoUbicacion'].setValue(this.catEstados[this.searchArray])
                    //MUNICIPIO
                    this.catMunicipiosService.find(this.estadoUbicacionTem)
                      .pipe(
                        map((res: HttpResponse<ICatMunicipios[]>) => {
                          return res.body ? res.body : [];
                        })
                      )
                      .subscribe((resBody: ICatMunicipios[]) => (
                        this.catMunicipios = resBody,
                        this.municipioUbicacion = this.municipioTempUbicacion,
                        this.searchArray = this.catMunicipios.findIndex(x => x.Municipio === this.municipioTempUbicacion),
                        this.editForm.controls['MunicipioUbicacion'].setValue(this.catMunicipios[this.searchArray]),
                        Swal.close()
                      ))

                  });



            } else {
              Swal.fire({
                title: 'No se pudo realizar la acción',
                text: 'Cliente Inactivo',
                icon: 'warning',
                showCloseButton: true,
              });
            }


          });



        break
      case "catTipoProducto":
        console.log(value);
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...',
        });
        Swal.showLoading();
        this.tipoProductoTable = value.Descripcion;
        this.conceptoClaveUnidad = value.TipoProducto;
        this.catTipoProductoService.find(value.TipoProducto)
          .pipe(
            map((res: HttpResponse<ICatTipoProducto[]>) => {
              return res.body ? res.body : [];

            })
          )
          .subscribe((resBody: ICatTipoProducto[]) => (
            this.tipoProducto = resBody,
            //this.editForm.controls['BienesTransp'].setValue(value.Descripcion),
            Swal.close()
          ));
        break;
      case "descripcion":
        // console.log("DESCRIPCION");
        // console.log(value);
        this.ClaveProdServ = value.ClaveProducto;
        this.descripcion = value.Descripcion;
        //this.ClaveUnidad = value.ClaveProducto;

        if (value.MaterialPeligroso == "Sí") {
          console.log("Material Peligroso");
          console.log(value.MaterialPeligroso);
          this.materialPeligrosoService
            .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1))
            .pipe(
              map((res: HttpResponse<IMaterialPeligroso[]>) => {
                return res.body ? res.body : [];
              })
            )
            .subscribe((resBody: IMaterialPeligroso[]) => (
              console.log("Datos de Material Peligroso"),
              console.log(resBody),
              this.materialPeligroso = resBody,
              this.MaterialPeligroso = "Sí",
              this.CveMaterialPeligroso = this.materialPeligroso[0].CveMaterialPeligroso,
              this.Embalaje = this.materialPeligroso[0].Embalaje
            ));
        } else {
          this.MaterialPeligroso = null;
          this.CveMaterialPeligroso = null;
          this.Embalaje = null;
        }
        break;
      case "unidad":
        console.log("UNIDAD");
        this.ClaveUnidad = value.ClaveUnidad;
        this.Unidad = value.Nombre;
        break;
      case "numpermisosct":
        console.log("PERMISO SCT");
        console.log(value);
        //this.PermSCT = value;
        this.PermSCT = value.Clave;//this.editForm.controls['PermSCT'].value;
        break;
      case "UpperCase":
        let fec = this.editForm.controls['RFCFigura'].value;
        this.editForm.controls['RFCFigura'].setValue(fec.toUpperCase());
        break;
      case "rfcremitente":
        let frev = this.editForm.controls['RFCRemitenteDestinatario'].value;
        this.editForm.controls['RFCRemitenteDestinatario'].setValue(frev.toUpperCase());
        break;
      case "operador":

        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...',
        });
        Swal.showLoading();


        this.catOperadorService.find(this.editForm.controls['NumeroEmpleado'].value)
          .pipe(
            map((res: HttpResponse<CatIOperador>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBody: CatIOperador) => {
            if (resBody) {
              if (resBody.NumeroLicencia == null || resBody.NumeroLicencia == undefined || resBody.RFC == null || resBody.RFC == undefined || resBody.Nombre == null || resBody.Nombre == undefined) {
                this.editForm.controls['RFCFigura'].setValue(resBody.RFC),
                  this.editForm.controls['NumLicencia'].setValue(resBody.NumeroLicencia),
                  this.editForm.controls['NombreFigura'].setValue(resBody.ApellidoPaterno + ' ' + resBody.ApellidoPaterno + ' ' + resBody.Nombre),
                  this.editForm.controls['RFCFigura'].disable(),
                  this.editForm.controls['NumLicencia'].disable(),
                  this.editForm.controls['NombreFigura'].disable(),
                  Swal.fire({
                    title: 'No se pudieron cargar todos los datos del operador',
                    text: '',
                    icon: 'warning',
                    showCloseButton: true,
                  });
              } else {
                this.editForm.controls['RFCFigura'].setValue(resBody.RFC),
                  this.editForm.controls['NumLicencia'].setValue(resBody.NumeroLicencia),
                  this.editForm.controls['NombreFigura'].setValue(resBody.ApellidoPaterno + ' ' + resBody.ApellidoPaterno + ' ' + resBody.Nombre),
                  this.editForm.controls['RFCFigura'].disable(),
                  this.editForm.controls['NumLicencia'].disable(),
                  this.editForm.controls['NombreFigura'].disable(),
                  Swal.close()
              }


            } else {
              Swal.fire({
                title: 'No se pudo realizar la acción',
                text: '',
                icon: 'warning',
                showCloseButton: true,
              });
            }

          });

        break;
      default:
        console.log("No such day exists!");
        break;
    }
  }


  hasRol(authorities: string[] | string): boolean {
    return this.accountService.hasAnyAuthority(authorities);
  }

  saveData(timbrado: boolean) {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...',
    });

    Swal.showLoading();
    const value = this.createFromForm();
    this.generarCarta.VersionGepp = "2.2";
    this.generarCarta.Version = "3.3";
    this.generarCarta.Serie = this.serie;
    this.generarCarta.Folio = this.folio;
    this.generarCarta.Fecha = this.FechaActual;
    this.generarCarta.FormaPago = null;
    this.generarCarta.SubTotal = 0;
    this.generarCarta.Moneda = "XXX";
    this.generarCarta.Total = 0;
    this.generarCarta.TipoDeComprobante = "T";
    this.generarCarta.LugarExpedicion = this.LugarExpedicion;


    /**
     * expedido
     */

    this.ExpedidoEn = {
      Calle: '',
      Colonia: '',
      Municipio: this.municipioExpedido,
      Estado: this.estadoExpedido,
      Pais: this.paisExpedido,
      CodigoPostal: this.LugarExpedicion,
    };

    this.emisor_g.DomicilioFiscal = this.DomicilioFiscal;
    this.emisor_g.ExpedidoEn = this.ExpedidoEn;
    this.generarCarta.Emisor = this.emisor_g;

    this.generarCarta.Receptor = this.receptor_g;


    /**
     * CFDI RELACIONADOS
     */
    this.CfdiRelacionados = {

      TipoRelacion: "",
      CfdiRelacionado: []

    };

    this.generarCarta.CfdiRelacionados = this.CfdiRelacionados;

    this.generarCarta.Receptor = this.receptor_g;


    // /**
    //  * CONCEPTOS
    // */

    let conceptosTemp: Array<any> = [];
    this.dataSource.forEach(function (value) {
      let auxConcepto = {
        ClaveProdServ: value.ClaveProdServ,
        Cantidad: value.Cantidad,
        ClaveUnidad: value.ClaveUnidad,
        Unidad: value.Unidad,
        Descripcion: value.Descripcion,
        ValorUnitario: 0,
        Importe: 0,
        TipoProducto: this.conceptoClaveUnidad,
        PesoBrut: 0,
        PesoUnidad: 0,
        PesoBrutoTotal: 0,
        NumTotalMercancias: 0
      };
      conceptosTemp.push(auxConcepto);

    });

    this.generarCarta.Conceptos = conceptosTemp;


    //this.generarCarta.Conceptos = this.conceptos;

    // /**
    //  * OBSERVACIONES
    // */
    this.Observaciones = [{
      Numero: 1,
      Tema: 'PAG',
      Texto: '',

    }];
    this.generarCarta.Observaciones = this.Observaciones;

    //METODO DE ENVIO 
    this.generarCarta.MetodoEnvio = { Email: this.editForm.controls['Correo'].value }
    /**
    //  ****************** CARTA PORTE *********************

    /**
     * OPERADOR
     */
    this.operador.TipoFigura = this.editForm.controls['TipoFigura'].value;
    this.operador.RFCFigura = this.editForm.controls['RFCFigura'].value;
    this.operador.NombreFigura = this.editForm.controls['NombreFigura'].value;
    this.operador.NumLicencia = this.editForm.controls['NumLicencia'].value;
    this.TiposFigura = this.operador;

    /**
    * ClaveBodega
    */
    this.Seguros = {
      AseguraRespCivil: this.editForm.controls['AseguraRespCivil'].value,
      PolizaRespCivil: this.editForm.controls['PolizaRespCivil'].value,

    };

    this.IdentificacionVehicular = {
      AnioModeloVM: this.editForm.controls['AnioModeloVM'].value,
      PlacaVM: this.editForm.controls['PlacaVM'].value,
      ConfigVehicular: this.editForm.controls['ConfigVehicular'].value,
    };

    this.Autotransporte = {
      NumPermisoSCT: this.editForm.controls['NumPermisoSCT'].value,
      eco: this.Eco,
      PermSCT: this.PermSCT,//this.editForm.controls['PermSCT'].value,
      IdentificacionVehicular: this.IdentificacionVehicular,
      Seguros: this.Seguros
    };


    /**
     * Mercancias
     */
    let mercanciaTemp: Array<any> = [];
    let pesoBrutoTemp = 0;
    this.dataSource.forEach(function (value) {

      let cargaMercanciaTemp = {
        BienesTransp: value.carga.BienesTransp,
        Cantidad: value.carga.Cantidad,
        Unidad: value.carga.Unidad,
        Descripcion: value.carga.Descripcion,
        ClaveUnidad: value.carga.ClaveUnidad,
        PesoEnKg: value.carga.PesoEnKg,
        MaterialPeligroso: value.carga.MaterialPeligroso,
        CveMaterialPeligroso: value.carga.CveMaterialPeligroso,
        Embalaje: value.carga.Embalaje,
      };

      pesoBrutoTemp += Number(value.carga.PesoEnKg);
      mercanciaTemp.push(cargaMercanciaTemp);
    });

    /**
     * ubicaciones 
     */
    let ubicacionesTemp: Array<any> = [];

    const ubicacionesTotal = this.ubicacionDestino.concat(this.ubicacionOrigen[0]);

    ubicacionesTemp.push(ubicacionesTotal);


    let aux = { Ubicacion: ubicacionesTemp[0] };
    let auxFigura = { TiposFigura: [this.TiposFigura] };


    let auxMerc = {
      PesoBrutoTotal: pesoBrutoTemp,
      UnidadPeso: "KGM",
      NumTotalMercancias: this.NumTotalMercancias,
      Mercancia: mercanciaTemp,
      Autotransporte: this.Autotransporte
    };

    this.CartaPorte = {
      Version: "2.0",
      TranspInternac: "No",
      TotalDistRec: this.totalDistancia,
      Ubicaciones: aux,
      Mercancias: auxMerc,
      FiguraTransporte: auxFigura,
      ClaveBodega: this.editForm.controls['ClaveBodega'].value,
      ClaveCliente: this.editForm.controls['ClaveCliente'].value,

    };

    console.log("this.CartaPorte: ", this.CartaPorte)

    this.generarCarta.CartaPorte = this.CartaPorte;
    let tmpDateFechaSalida = this.editForm.controls['FechaSalida'].value;
    let tmpTimeSalida = this.editForm.controls['HoraSalida'].value;
    let tmpDateFechaLlegada = this.editForm.controls['FechaSalidaLlegada'].value;
    let tmpTime = this.editForm.controls['HoraLlegada'].value;


    let formattedDateFechaSalida = this.datepipe.transform(tmpDateFechaSalida, 'YYYY-MM-dd') + 'T' + tmpTimeSalida + ':00';
    let formattedDateFechaLlegada = this.datepipe.transform(tmpDateFechaLlegada, 'YYYY-MM-dd') + 'T' + tmpTime + ':00';
    //console.log(this.editForm.controls['HoraLlegada'].value);
    let generarCataAux = {
      UsuarioCreador: this.localStorage.retrieve('UserId'),
      FechaSalidaOrigen: formattedDateFechaSalida,
      FechaLlegadaDestino: formattedDateFechaLlegada,
      CartaPorte: this.generarCarta
    };

    this.subscribeToSaveResponse(
      this.generarCartaService.create(generarCataAux, timbrado)
    );

  }

  updateData(timbrado: boolean) {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...',
    });
    Swal.showLoading();

    //this.generarCartaPorteUpdate
    this.generarCartaUpdate.VersionGepp = this.generarCarta.VersionGepp;
    this.generarCartaUpdate.Version = this.generarCarta.Version;
    this.generarCartaUpdate.Serie = this.generarCarta.Serie;
    this.generarCartaUpdate.Folio = this.generarCarta.Folio;
    this.generarCartaUpdate.Fecha = this.FechaActual;
    this.generarCartaUpdate.FormaPago = null;
    this.generarCartaUpdate.SubTotal = 0;
    this.generarCartaUpdate.Moneda = "XXX";
    this.generarCartaUpdate.Total = 0;
    this.generarCartaUpdate.TipoDeComprobante = "T";
    this.generarCartaUpdate.LugarExpedicion = this.LugarExpedicion;


    /**
    * expedido
    */

    this.ExpedidoEn = {
      Calle: '',
      Colonia: '',
      Municipio: this.municipioExpedido,
      Estado: this.estadoExpedido,
      Pais: this.paisExpedido,
      CodigoPostal: this.LugarExpedicion,
    };

    this.emisor_g.ExpedidoEn = this.ExpedidoEn;
    this.emisor_g.DomicilioFiscal = this.DomicilioFiscal;
    this.generarCartaUpdate.Emisor = this.emisor_g;

    /**
     * CFDI RELACIONADOS
     */
    this.CfdiRelacionados = {

      TipoRelacion: "",
      CfdiRelacionado: []

    };

    this.generarCartaUpdate.CfdiRelacionados = this.CfdiRelacionados;
    this.generarCartaUpdate.Receptor = this.receptor_g;

    /**
     * CONCEPTOS
     */

    let conceptosTemp: Array<any> = [];
    this.dataSource.forEach(element => {
      let auxConcepto = {
        ClaveProdServ: element.ClaveProdServ,
        Cantidad: element.Cantidad,
        ClaveUnidad: element.ClaveUnidad,
        Unidad: element.Unidad,
        Descripcion: element.Descripcion,
        ValorUnitario: 0,
        Importe: 0,
        TipoProducto: this.conceptoClaveUnidad,
        pesoCarga: 0,
        PesoBruto: 0,
        PesoUnidad: 0
      };

      conceptosTemp.push(auxConcepto);
    });

    this.generarCartaUpdate.Conceptos = conceptosTemp;



    // /**
    //  * OBSERVACIONES
    // */
    this.Observaciones = [{
      Numero: 1,
      Tema: 'PAG',
      Texto: '',

    }];
    this.generarCartaUpdate.Observaciones = this.Observaciones;

    //METODO DE ENVIO
    //METODO DE ENVIO 
    this.generarCartaUpdate.MetodoEnvio = { Email: this.editForm.controls['Correo'].value }

    //**OPERADOR */
    this.operador.TipoFigura = this.editForm.controls['TipoFigura'].value;
    this.operador.RFCFigura = this.editForm.controls['RFCFigura'].value;
    this.operador.NombreFigura = this.editForm.controls['NombreFigura'].value;
    this.operador.NumLicencia = this.editForm.controls['NumLicencia'].value;
    this.TiposFigura = this.operador;

    /**
    * AUTOTRANSPORTE
    */
    this.Seguros = {
      AseguraRespCivil: this.editForm.controls['AseguraRespCivil'].value,
      PolizaRespCivil: this.editForm.controls['PolizaRespCivil'].value,

    };

    this.IdentificacionVehicular = {
      AnioModeloVM: this.editForm.controls['AnioModeloVM'].value,
      PlacaVM: this.editForm.controls['PlacaVM'].value,
      ConfigVehicular: "C2",
    };

    this.Autotransporte = {
      NumPermisoSCT: this.editForm.controls['NumPermisoSCT'].value,
      PermSCT: this.PermSCT,//this.editForm.controls['PermSCT'].value,
      eco: this.Eco,
      IdentificacionVehicular: this.IdentificacionVehicular,
      Seguros: this.Seguros
    };

    /**
    * ubicaciones 
    */
    let ubicacionesTemp: Array<any> = [];
    console.log("UBICACIONES")
    console.log(this.ubicacionOrigen)
    const ubicacionesTotal = this.ubicacionDestino.concat(this.ubicacionOrigen);
    ubicacionesTemp.push(ubicacionesTotal);


    let mercanciaTemp: Array<any> = [];
    let pesoBrutoTemp = 0;

    this.dataSource.forEach(value => {
      let cargaMercanciaTemp = {
        BienesTransp: value.ClaveProdServ,
        Cantidad: value.Cantidad,
        Unidad: value.Unidad,
        Descripcion: value.Descripcion,
        ClaveUnidad: value.ClaveUnidad,
        PesoEnKg: value.PesoEnKg,
        MaterialPeligroso: this.MaterialPeligroso,
        CveMaterialPeligroso: this.CveMaterialPeligroso,
        Embalaje: this.Embalaje,

      };
      pesoBrutoTemp += Number(value.PesoEnKg);
      mercanciaTemp.push(cargaMercanciaTemp);
    });


    let aux = { Ubicacion: ubicacionesTemp[0] };
    console.log("Pintar fecha ultima")
    let FechaSalidaOrigen = aux.Ubicacion[0].FechaHoraSalidaLlegada
    console.log(FechaSalidaOrigen)
    let FechaLlegadaDestino = aux.Ubicacion[aux.Ubicacion.length - 1].FechaHoraSalidaLlegada
    console.log(FechaSalidaOrigen)

    let auxFigura = { TiposFigura: [this.TiposFigura] };
    let auxMerc = {
      PesoBrutoTotal: pesoBrutoTemp,
      UnidadPeso: "KGM",
      NumTotalMercancias: mercanciaTemp.length,
      Mercancia: mercanciaTemp,
      Autotransporte: this.Autotransporte
    };

    this.CartaPorte = {
      Version: "2.0",
      TranspInternac: "No",
      TotalDistRec: this.totalDistancia,
      Ubicaciones: aux,
      Mercancias: auxMerc,
      FiguraTransporte: auxFigura,
      ClaveBodega: this.editForm.controls['ClaveBodega'].value,
      ClaveCliente: this.editForm.controls['ClaveCliente'].value,
    };

    console.log("this.CartaPorte: ", this.CartaPorte)

    this.generarCartaUpdate.CartaPorte = this.CartaPorte;

    //console.log(this.editForm.controls['HoraLlegada'].value);

    let generarCataAux = {
      UsuarioCreador: "4",
      FechaSalidaOrigen: FechaSalidaOrigen,
      FechaLlegadaDestino: FechaLlegadaDestino,
      MetodoEnvio: { Email: this.editForm.controls['Correo'].value },
      CartaPorte: this.generarCartaUpdate
    };


    console.log(this.generarCartaUpdate);

    this.subscribeToSaveResponse(
      this.generarCartaService.create(generarCataAux, timbrado),
    );

  }

  save(timbrado: boolean) {
    if (this.isEdit) {
      this.updateData(timbrado);
    } else {
      this.saveData(timbrado);
    }
  }

  private createFromForm(): IGenerarCata {
    return {
      ...this.editForm.value
    };
  }


  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      (res) => this.onSaveSuccess(res),
      () => this.onSaveError()
    );
  }



  protected onSaveSuccess(res): void {
    console.log("Respuesta");
    console.log(res.body);
    if (res.body.RespuestaTimbrado != null) {
      if (res.body.Serie == "" && res.body.Folio == "") {
        this.isSaving = false;
        if (this.auxSave) {
          this.auxSave.emit(false);
        }

        Swal.fire({
          title: 'No se pudo realizar la acción',
          text: 'No fue Posible Realizar la Acción',
          icon: 'warning',
          showCloseButton: true,
        });
      } else {
        this.isSaving = true;
        Swal.close();
        if (res.body.RespuestaTimbrado.error == null) {
          Swal.fire({
            icon: 'success',
            text: 'Guardado y Timbrado',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
            html: '<p>Folio Timbrado <b>' + res.body.FolioTimbrado + '</b> </p>' +
              '<p>Folio <b>' + res.body.Folio + '</b> </p>' +
              '<p>Fecha <b>' + res.body.RespuestaTimbrado.fechaTimbre + '</b></p> ' +
              '<p>uuid <b>' + res.body.RespuestaTimbrado.uuid + '</b></p>',
          }).then((result) => {
            if (result.isConfirmed) {
              //window.location.reload();
              this.folio = res.body.Folio;
              this.serie = res.body.Serie;
            }
          })
        } else {
          
            Swal.fire({
              icon: 'warning',
              text: 'Guardado',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
              html: '<p>Folio <b>' + res.body.Folio + '</b> </p>' +
                '<p>Fecha <b>' + res.body.RespuestaTimbrado.fechaTimbre + '</b></p> ' +
                '<p>uuid <b>' + res.body.RespuestaTimbrado.uuid + '</b></p>' +
                '<p>Mensage' + res.body.RespuestaTimbrado.error + '</p>',
            }).then((result) => {
              if (result.isConfirmed) {
                //window.location.reload();
                this.folio = res.body.Folio;
                this.serie = res.body.Serie;
              }
            })
          
        }

      }
    } else {
      if (res.body.Folio) {
        Swal.fire({
          icon: 'success',
          text: 'Guardado',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
          html: '<p>Folio <b>' + res.body.Folio + '</b> </p>' ,
        }).then((result) => {
          if (result.isConfirmed) {
            //window.location.reload();
            this.folio = res.body.Folio;
            this.serie = res.body.Serie;
          }
        })
      }else{
        this.isSaving = false;
        if (this.auxSave) {
          this.auxSave.emit(false);
        }

      

        Swal.fire({
          title: 'No se pudo realizar la acción',
          text: 'No fue Posible Realizar la Acción',
          icon: 'warning',
          showCloseButton: true,
        });
      }
      
    }


  }

  protected onSaveError(): void {
    this.isSaving = false;
    if (this.auxSave) {
      this.auxSave.emit(false);
    }

    Swal.fire({
      title: 'No se pudo realizar la acción',
      text: 'No fue Posible Realizar la Acción',
      icon: 'warning',
      showCloseButton: true,
    });
  }

  validateCP() {
    var regexp = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
    var isValid = regexp.test(this.editForm.controls['CodigoPostal'].value);
    if (isValid) {
      this.cpEmisorValidate = "Formato de CP valido"
    } else {
      this.cpEmisorValidate = "Formato CP no valido"
    }
  }

  importItem(): void {
    console.log("AQUI ENTRA");
    // console.log(value);
    // value.trip_id = this.trip_id;
    const params = {

      title: "CLIENTS.NEW"
    };
    const dialogRef = this.dialog.open(ImportExcelPages, { data: params });
    dialogRef.updateSize("100%");
    dialogRef.afterClosed().subscribe((src: any) => {
      if (src) {
        //this.loadPage();
        // this.message('Creado');
      }
    });
  }

  changedBodega(value: any) {
    console.log("entro", value)

  }

  buscarBodega(origen: number, value: any): void {

    if (origen == 1) {

      if (this.showDetailOrigen) {
        this.showDetailOrigen = false;
      } else {
        this.showDetailOrigen = true;
      }
    } else {
      if (value.checked) {
        this.editForm.controls['ClaveBodega'].disable()
        this.editForm.controls['ClaveCliente'].disable()
      } else {
        this.editForm.controls['ClaveBodega'].enable()
        this.editForm.controls['ClaveCliente'].enable()
      }
      if (this.showDetailDestino) {
        this.showDetailDestino = false;
      } else {
        this.showDetailDestino = true;
      }
    }


    // const params = {
    //   title: "CLIENTS.NEW"
    // };

    // const dialogRef = this.dialog.open(BodegaPages, { data: params });
    // dialogRef.updateSize("100%");
    // dialogRef.afterClosed().subscribe((bodegatSelect: any) => {
    //   console.log("SRC AQUI", this.bodegatSelect)

    // });
  }



  addBodega(origen: number, src: any) {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...',
    });
    Swal.showLoading();
    console.log('Bodega CP...: ', src);
    if (origen == 1) {
      this.LugarExpedicion = src.CodigoPostal
      this.editForm.controls['bodega'].setValue(src.Nombre)
      this.paisExpedido = 'MEX',
        this.catCPsService.findByCodigoPostal(src.CodigoPostal)
          .pipe(
            map((res: HttpResponse<any>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBodyCp: ICatCP[]) => (
            this.searchBodega = resBodyCp[0],
            //estado
            this.catEstadosService.find('MEX')
              .pipe(
                map((res: HttpResponse<ICatEstados[]>) => {
                  return res.body ? res.body : [];
                })
              )
              .subscribe((resBody: ICatEstados[]) => (
                this.catEstados = resBody,
                this.searchArray = this.catEstados.findIndex(x => x.ClaveEstado === this.searchBodega.Estado),
                this.estadoExpedido = this.catEstados[this.searchArray].ClaveEstado,
                //MUNICIPIO

                this.catMunicipiosService.find(this.catEstados[this.searchArray].Nombre)
                  .pipe(
                    map((res: HttpResponse<ICatMunicipios[]>) => {
                      return res.body ? res.body : [];
                    })
                  )
                  .subscribe((resBody: ICatMunicipios[]) => (
                    this.catMunicipios = resBody,
                    this.searchArray = this.catMunicipios.findIndex(x => x.Municipio === this.searchBodega.Municipio),
                    this.municipioExpedido = this.catMunicipios[this.searchArray].Municipio,
                    Swal.close()

                  ))

              ))


          ))

    } else {
      this.showDetailDestino = false;
      // this.paisUbicacion == undefined || this.municipioUbicacion == undefined || this.estadoUbicacion == undefined
      this.editForm.controls['RFCRemitenteDestinatario'].setValue("XAXX010101000")
      if (src) {
        this.editForm.controls['PaisUbicacion'].setValue(this.catPaises[0]),
          this.paisUbicacion = this.catPaises[0].IdPais,
          this.editForm.controls['CodigoPostalUbicacion'].setValue(src.CodigoPostal),
          this.catCPsService.findByCodigoPostal(src.CodigoPostal)
            .pipe(
              map((res: HttpResponse<any>) => {
                return res.body ? res.body : [];
              })
            )
            .subscribe((resBodyCp: ICatCP[]) => (
              this.searchBodega = resBodyCp[0],
              //estado
              this.catEstadosService.find('MEX')
                .pipe(
                  map((res: HttpResponse<ICatEstados[]>) => {
                    return res.body ? res.body : [];
                  })
                )
                .subscribe((resBody: ICatEstados[]) => (
                  this.catEstados = resBody,
                  this.searchArray = this.catEstados.findIndex(x => x.ClaveEstado === this.searchBodega.Estado),
                  this.editForm.controls['EstadoUbicacion'].setValue(this.catEstados[this.searchArray]),
                  this.estadoUbicacion = this.catEstados[this.searchArray].ClaveEstado,
                  //MUNICIPIO

                  this.catMunicipiosService.find(this.catEstados[this.searchArray].Nombre)
                    .pipe(
                      map((res: HttpResponse<ICatMunicipios[]>) => {
                        return res.body ? res.body : [];
                      })
                    )
                    .subscribe((resBody: ICatMunicipios[]) => (
                      this.catMunicipios = resBody,

                      this.searchArray = this.catMunicipios.findIndex(x => x.Municipio === this.searchBodega.Municipio),
                      this.editForm.controls['MunicipioUbicacion'].setValue(this.catMunicipios[this.searchArray]),
                      this.municipioUbicacion = this.catMunicipios[this.searchArray].Municipio,
                      Swal.close()

                    ))

                ))


            ))

      }
    }

  }


}
