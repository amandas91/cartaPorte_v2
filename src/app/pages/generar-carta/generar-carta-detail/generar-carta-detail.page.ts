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
import { threadId } from "worker_threads";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";


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

  PesoBrutoTotal: number;

  ClaveProdServ: string;
  descripcion: string;
  ClaveUnidad: string;
  MaterialPeligroso: string;
  CveMaterialPeligroso: string;
  Embalaje: string;

  displayedColumns: string[] = ['Linea', 'ClaveProdServ', 'Descripcion', 'Cantidad', 'Unidad', 'PesoUnidad', 'PesoBruto', 'action'];
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

  paisUbicacion: number;
  estadoUbicacion: string;
  municipioUbicacion: string;
  cpUbicacion: string;

  Unidad: string;

  conceptoUnidad: string;
  conceptoClaveUnidad: string;

  NumTotalMercancias: number = 0;
  PermSCT: string;


  calleTest: any[];

  folio: string;
  serie: string;

  origen: boolean = false;

  tipoProductoTable: string;

  @Output()
  auxSave: EventEmitter<boolean> = new EventEmitter();

  @Input()
  parentForm?: FormGroup;

  @Output()
  formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  ELEMENT_DATA: UbicacionElementTable[] = [];
  dataSource1 = new MatTableDataSource(this.ELEMENT_DATA);
  //dataSource1: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  @ViewChild(MatTable) table: MatTable<CargaElementTable>;
  @ViewChild(MatTable) tableUbicacion: MatTable<UbicacionElementTable>;
  emisorTemp: { CreateDate: string; IdEmisor: number; Nombre: string; RegimenFiscal: string; Rfc: string; };


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
    private monitorService: MonitoreoService

  ) {
    this.createForm();
    this.dataSource = [];
  }

  createForm() {
    this.editForm = this.fb.group({
      Nombre: [null, [Validators.required]],
      Rfc: [null, [Validators.required]],
      RegimenFiscal: [null, [Validators.required]],
      Pais: [null, [Validators.required]],
      Estado: [null, [Validators.required]],
      Municipio: [null, [Validators.required]],
      CodigoPostal: [null, [Validators.required]],
      RfcReceptor: [null, [Validators.required,
      Validators.maxLength(13),
      Validators.minLength(13)
      ]],
      NombreReceptor: [null, []],
      UsoCFDI: [null, []],
      RFCFigura: [null, [Validators.required,
      Validators.maxLength(13),
      Validators.minLength(13)
      ]],
      NumLicencia: [null, []],
      NombreFigura: [null, []],
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
      FechaSalidaLlegada: [null, [Validators.required]],
      FechaSalida: [null, [Validators.required]],
      HoraSalida: [null, [Validators.required]],
      HoraSalidaLlegada: [null, [Validators.required]],
      HoraLlegada: [null, [Validators.required]],
      ClaveBodega: [null, []],
      ClaveCliente: [null, []]
    });

    this.editForm.controls["RFCFigura"].valueChanges.subscribe(data => {
      console.log(data);
    });
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
    this.FechaActual = this.datepipe.transform(Date.now(), 'yyyy-MM-ddTh:mm:ss');

    this.activatedRoute.params.subscribe(params => {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      this.emisorService
        .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1))
        .pipe(
          map((res: HttpResponse<IEmisor[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: IEmisor[]) => (this.emisor = resBody));

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
        .subscribe((resBody: ICatTipoFiguraTransporte[]) => (this.catTipoFiguraTransporte = resBody));

      // console.log('params: ', params);
      this.serie = params.id;
      this.folio = params.id;

      // console.log("AQUI");
      // console.log(params.folio);
      if (params.folio) {
        this.monitorService.findMotivo('T', params.folio)
          .pipe(
            map((res: HttpResponse<any>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBody: any) => (
            this.update(resBody)
          ))

      } else {
        Swal.close()
      }

    });

  }


  update(resBody) {
    /**
     * Llenando Tabla de Carga
     */
    let auxcargaElementList: any;
    let auxubicacionElementList: any;
    console.log("TODO CARTA"),
      console.log(resBody),
      resBody.Conceptos.forEach(
        function obj(value) {
          let auxcargaMercancia = {
            BienesTransp: value.ClaveProdServ,
            Cantidad: value.Cantidad,
            Unidad: value.ClaveUnidad,
            Descripcion: value.descripcion,
            ClaveUnidad: value.ClaveUnidad,
            PesoEnKg: 0,
            MaterialPeligroso: null,
            CveMaterialPeligroso: null,
            Embalaje: null,
          }

          auxcargaElementList = {
            ClaveProdServ: value.ClaveProdServ,
            Cantidad: value.Cantidad,
            ClaveUnidad: value.ClaveUnidad,
            Unidad: value.Unidad,
            Descripcion: value.descripcion,
            ValorUnitario: 0,
            Importe: 0,
            carga: auxcargaMercancia

          }
          return auxcargaElementList

        }

      ),
      this.dataSource.push(auxcargaElementList);
    this.table.renderRows()
    /**
     * Llenando Tabla de Carga
     */

    /**
    * Llenando Tabla de Ubicacion 
    */

    resBody.CartaPorte.Ubicaciones.Ubicacion.forEach(
      function obj(value) {
        let auxdomicilio = {
          CodigoPostal: value.Domicilio.CodigoPostal,
          Colonia: value.Domicilio.Colonia,
          Estado: value.Domicilio.Estado,
          Localidad: value.Domicilio.Localidad,
          Municipio: value.Domicilio.CodMunicipioigoPostal,
          Pais: value.Domicilio.Pais
        }

        auxubicacionElementList = {
          rfc: value.RFCRemitenteDestinatario,
          fecha: value.FechaHoraSalidaLlegada,
          direccion: value.Domicilio.Estado,
          cp: value.Domicilio.CodMunicipioigoPostal,
          distancia: value.DistanciaRecorrida,
          ubicacion: ""
        }


        return auxubicacionElementList

      }

    ),

      this.dataSource1.data.push(auxubicacionElementList);
    this.dataSource1.sort = this.sort;

    this.emisorTemp = {
      CreateDate: "2022-01-04T19:21:43",
      IdEmisor: 3,
      Nombre: "PAC QA",
      RegimenFiscal: "601",
      Rfc: "URE180429TM6",
    },
      this.generarCarta = resBody,
      console.log("Consulta de Carta"),
      console.log(this.generarCarta),

      //Emisor
      this.editForm.controls['Rfc'].setValue(this.emisorTemp),
      this.editForm.controls['Nombre'].setValue(this.generarCarta.Emisor.Nombre),
      this.editForm.controls['RegimenFiscal'].setValue(this.generarCarta.Emisor.RegimenFiscal),
      this.editForm.controls['CodigoPostal'].setValue(this.generarCarta.Emisor.DomicilioFiscal.CodigoPostal),
      //Receptor
      this.editForm.controls['NombreReceptor'].setValue(this.generarCarta.Receptor.Nombre),
      this.editForm.controls['UsoCFDI'].setValue(this.generarCarta.Receptor.UsoCFDI),
      //Operador
      this.editForm.controls['RFCFigura'].setValue(this.generarCarta.CartaPorte.FiguraTransporte.TiposFigura[0].RFCFigura),
      this.editForm.controls['NumLicencia'].setValue(this.generarCarta.CartaPorte.FiguraTransporte.TiposFigura[0].NumLicencia),
      this.editForm.controls['TipoFigura'].setValue(this.generarCarta.CartaPorte.FiguraTransporte.TiposFigura[0].TipoFigura),
      this.editForm.controls['NombreFigura'].setValue(this.generarCarta.CartaPorte.FiguraTransporte.TiposFigura[0].NombreFigura),

      //Unidad y Transporte
      // this.editForm.controls['Eco'].setValue(this.generarCarta.CartaPorte.Autotransporte),
      // this.editForm.controls['NumPermisoSCT'].setValue(this.generarCarta.CartaPorte.Autotransporte.NumPermisoSCT),
      // this.editForm.controls['AnioModeloVM'].setValue(this.generarCarta.CartaPorte.Autotransporte.IdentificacionVehicular.AnioModeloVM),
      // this.editForm.controls['PlacaVM'].setValue(this.generarCarta.CartaPorte.Autotransporte.NumPermisoSCT),
      // this.editForm.controls['PolizaRespCivil'].setValue(this.generarCarta.CartaPorte.Autotransporte.NumPermisoSCT),
      // this.editForm.controls['AseguraRespCivil'].setValue(this.generarCarta.CartaPorte.Autotransporte.NumPermisoSCT),





      Swal.close()
  }


  addData() {

    this.PesoBrutoTotal += Number(this.editForm.controls['PesoEnKg'].value);

    this.NumTotalMercancias += Number(this.editForm.controls['Cantidad'].value);

    var pesoBrutoPoducto = 0;

    pesoBrutoPoducto = Number(this.editForm.controls['PesoEnKg'].value) * Number(this.editForm.controls['Cantidad'].value);

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


    // this.cargaElementList = {
    //   ClaveProdServ: ""+this.ClaveProdServ, 
    //   Cantidad:Number(this.editForm.controls['Cantidad'].value),
    //   ClaveUnidad: this.ClaveUnidad, 
    //   Unidad: this.Unidad,
    //   Descripcion: this.descripcion,
    //   ValorUnitario: 0,
    //   Importe: 0,
    //   carga:this.cargaMercancia

    // };

    //this.conceptos.push(this.cargaElementList);
    this.dataSource.push(this.cargaElementList);
    this.table.renderRows();

    console.log(this.dataSource);

  }

  deleteRowData(index, element) {
    //this.dataSource.pop();
    //rthis.table.renderRows();
    // //console.log(element);
    // this.dataSource = this.dataSource.splice(index, 1);
    // // this.dataSource1.data= this.dataSource1.data.filter((value,key)=>{
    // //   return value.fecha != element.fecha;
    // // });

    const data = this.dataSource;

    data.splice(index, 1);

    this.dataSource = data;

    this.table.renderRows();

  }


  addDataUbicacion() {

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
        RFCRemitenteDestinatario: this.editForm.controls['RFCRemitenteDestinatario'].value.toUpperCase() ,
        IDUbicacion: 0,
        FechaHoraSalidaLlegada: formattedDate,
        DistanciaRecorrida: null,
        Domicilio: this.domicilio
      };

      this.ubicacionOrigen.push(aux);
      this.origen = true;
      console.log("AGREGAR ORIGEN");
      console.log(this.ubicacionOrigen);
    }

    let tmpDate = this.editForm.controls['FechaSalidaLlegada'].value;
    let tmpTime = this.editForm.controls['HoraLlegada'].value;
    let formattedDate = this.datepipe.transform(tmpDate, 'YYYY-MM-dd') + 'T' + tmpTime + ':00';

    let aux = {
      TipoUbicacion: "Destino",
      RFCRemitenteDestinatario: this.editForm.controls['RFCDestino'].value.toUpperCase(),
      IDUbicacion: 0,
      FechaHoraSalidaLlegada: formattedDate,
      DistanciaRecorrida: Number(this.editForm.controls['DistanciaRecorrida'].value),
      Domicilio: this.domicilio
    };

    this.ubicacionElementList = {
      rfc: this.editForm.controls['RFCDestino'].value,
      fecha: formattedDate,
      direccion: this.domicilio.Estado,
      cp: this.editForm.controls['CodigoPostalUbicacion'].value,
      distancia: this.editForm.controls['DistanciaRecorrida'].value,
      ubicacion: aux
    };

    this.totalDistancia += Number(this.editForm.controls['DistanciaRecorrida'].value);

    this.ubicacionDestino.push(aux);
    this.dataSource1.data.push(this.ubicacionElementList);
    this.dataSource1.sort = this.sort;
    console.log("AGREGAR Destino");
    console.log(this.ubicacionDestino);


    this.editForm.controls['DistanciaRecorrida'].setValue('');
    this.editForm.controls['PaisUbicacion'].setValue('');
    this.editForm.controls['EstadoUbicacion'].setValue('');
    this.editForm.controls['MunicipioUbicacion'].setValue('');
    this.editForm.controls['CodigoPostalUbicacion'].setValue('');

  }


  removeDataUbicacion(index, element) {
    const data = this.dataSource1.data;

    data.splice(index, 1);

    this.dataSource1.data = data;

    this.ubicacionDestino.splice(index, 1);

    console.log("eliminar Destino");
    console.log(this.ubicacionDestino);

    this.table.renderRows();
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


        let result = this.eamFlotaService.find(this.editForm.controls['Eco'].value)
          .pipe(
            map((res: HttpResponse<IEamFlota>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBody: IEamFlota) => {
            if (resBody.EstatusEco == 'ACTIVO') {
              this.editForm.controls['AnioModeloVM'].setValue(resBody.AnioCP);
              this.editForm.controls['PlacaVM'].setValue(resBody.PlacaCP);
              this.editForm.controls['PolizaRespCivil'].setValue(resBody.PolizaCP);
              this.editForm.controls['AseguraRespCivil'].setValue(resBody.AseguradoraCP);
              this.editForm.controls['NumPermisoSCT'].setValue(resBody.NoPermisoCP);
              this.editForm.controls['PermSCT'].setValue(resBody.TipoPermisoCP);
              Swal.close();
            } else {
              Swal.fire({
                title: 'Conflicto',
                text: resBody.message,
                icon: 'warning',
                showCloseButton: true,
              });

              //this.statusFlota = true;
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
      case "paisUbicación":
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
        console.log("EMISOR");
        console.log(value);
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...',
        });
        Swal.showLoading();
        this.editForm.controls['Nombre'].setValue(value.Nombre);
        this.editForm.controls['RegimenFiscal'].setValue(value.RegimenFiscal);
        this.emisor_g = this.editForm.controls['Rfc'].value;

        console.log("VALOR QUEVA A CONSULTAR");
        console.log(value.Rfc);
        this.domicilioFiscalService.findDomicilioFiscal(value.Rfc)
          .pipe(
            map((res: HttpResponse<IDomicilioFiscal[]>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBody: IDomicilioFiscal[]) => (
            this.domFiscal = resBody


          ));


        this.receptorService
          .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1))
          .pipe(
            map((res: HttpResponse<IReceptor[]>) => {
              return res.body ? res.body : [];
            })
          )
          .subscribe((resBody: IReceptor[]) => (this.receptor = resBody));



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
        this.editForm.controls['RFCDestino'].setValue(this.emisor_g.Rfc);
        this.editForm.controls['RFCRemitenteDestinatario'].setValue("XAXX010101000");

        Swal.close();

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
        console.log("DESCRIPCION");
        console.log(value);
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
    this.generarCarta.Serie = "";
    this.generarCarta.Folio = "";
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
      Municipio: this.municipioExpedido,
      Estado: this.estadoExpedido,
      Pais: this.paisExpedido,
      CodigoPostal: this.LugarExpedicion,
    };

    this.emisor_g.DomicilioFiscal = this.DomicilioFiscal;
    this.emisor_g.ExpedidoEn = this.ExpedidoEn;
    this.generarCarta.Emisor = this.emisor_g;


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
        Importe: 0
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
    /**
    //  ****************** CARTA PORTE *********************
    /**
     * ubicaciones 
     */
    let ubicacionesTemp: Array<any> = [];
    /*this.dataSource1.data.forEach(function (value) {
      ubicacionesTemp.push(value.ubicacion);
    });*/

    const ubicacionesTotal =  this.ubicacionDestino.concat(this.ubicacionOrigen[0]);

    ubicacionesTemp.push(ubicacionesTotal);

    //this.CartaPorte.Ubicaciones.push(ubicacionesTemp);


    /**
     * OPERADOR
     */
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
      IdentificacionVehicular: this.IdentificacionVehicular,
      Seguros: this.Seguros
    };


    //this.CartaPorte.Autotransporte = this.Autotransporte;
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
      FiguraTransporte: auxFigura
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
      UsuarioCreador: "4",
      DestinatariosCorreo: this.editForm.controls['Correo'].value,
      FechaSalidaOrigen: formattedDateFechaSalida,
      FechaLlegadaDestino: formattedDateFechaLlegada,
      CartaPorte: this.generarCarta
    };

    this.subscribeToSaveResponse(
      this.generarCartaService.create(generarCataAux, timbrado)
    );



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
    console.log(res);

    if (res.body.Serie == "" && res.body.Serie == "") {
      this.isSaving = false;
      if (this.auxSave) {
        this.auxSave.emit(false);
      }

      Swal.fire({
        title: 'Conflicto',
        text: 'No fue Posible Realizar la Acción',
        icon: 'warning',
        showCloseButton: true,
      });
    } else {
      this.isSaving = true;
      Swal.close();
      Swal.fire({
        icon: 'success',
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
          window.location.reload();
        }
      })
      //window.location.reload();
    }

  }

  protected onSaveError(): void {
    this.isSaving = false;
    if (this.auxSave) {
      this.auxSave.emit(false);
    }

    Swal.fire({
      title: 'Conflicto',
      text: 'No fue Posible Realizar la Acción',
      icon: 'warning',
      showCloseButton: true,
    });
  }





}
