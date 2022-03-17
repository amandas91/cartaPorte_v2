import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from "@fuse/animations";
import { ICatEstados } from "app/models/catalogos/cat-estados.model";
import { CatMunicipios, ICatMunicipios } from "app/models/catalogos/cat-municipios.model";
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
import {LiveAnnouncer} from '@angular/cdk/a11y';
import Swal from "sweetalert2";
import { GenerarCata, IGenerarCata } from "app/models/core/generar-carta.model";
import { GenerarCartaService } from "app/services/core/generar-carta.service";
import { Observable } from 'rxjs';
import { ICatLista } from "app/models/catalogos/cat-lista.model";
import { ListaService } from "app/services/catalogos/cat-listas.service";
import { IOperador, Operador } from "app/models/core/operador.model";
import { ICliente } from "app/models/core/cliente.model";
import { ClienteService } from "app/services/core/cliente.service";
import { Domicilio, IDomicilio } from "app/models/core/domicilio.model";
import { IMaterialPeligroso, MaterialPeligroso } from "app/models/core/material-peligroso.model";
import { MaterialPeligrosoService } from "app/services/core/material-peligroso.service";
import { DatePipe } from '@angular/common';
import { DomicilioFiscalService } from "app/services/core/domicilio-fiscal";
import { IDomicilioFiscal } from "app/models/catalogos/cat-domicilio-fiscal.model";
import { ActivatedRoute } from "@angular/router";
import { MonitoreoService } from "app/services/core/monitoreo.servce";


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
  selector: 'app-generar-carta-detail',
  templateUrl: './generar-carta-detail.page.html',
  animations: fuseAnimations
  
})
export class GenerarCartaDetailPage implements OnInit, AfterViewInit{

  isLinear = false;
  index = 0;

  editForm = this.fb.group({
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
    RFCDestino:[null, [Validators.required]],
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

  catOwners: ICatOwners[];
  catPaises: ICatPaises[];
  catEstados: ICatEstados[];
  catMunicipios:ICatMunicipios[];
  catCP:ICatCP[];
  catTipoUnidad:ICatTipoUnidad[];
  catTipoFiguraTransporte:ICatTipoFiguraTransporte[];
  catTipoPermiso:ICatTipoPermiso[];
  catTipoRemolque:ICatTipoRemolque[];
  catTipoProducto:ICatTipoProducto[];
  tipoProducto:ICatTipoProducto[];
  tipoHorario:ICatLista[];
  eamFlota:IEamFlota[];
  cliente:ICliente[];
  statusFlota=false;
  cargaElementList: CargaElementTable;
  cargaMercancias:Mercancias;
  cargaMercancia: Mercancia;
  ubicacionElementList:UbicacionElementTable;
  operador = new Operador;
  generarCarta = new GenerarCata;
  CartaPorte:CataPorte;
  
  Mercancias:Mercancias[]  ;
  materialPeligroso:IMaterialPeligroso[];
  domicilio  = new Domicilio;
  emisor_g  = new Emisor;
  receptor_g = new Receptor;
  DomicilioFiscal:DomicilioFiscal;
  domFiscal:IDomicilioFiscal[];
  ExpedidoEn:ExpedidoEn;
  Observaciones:Observaciones[];
  TiposFigura:any;
  CfdiRelacionados:CfdiRelacionados;
  IdentificacionVehicular:IdentificacionVehicular;
  Autotransporte:Autotransporte;
  Seguros:Seguros;

  
  emisor:IEmisor[];
  receptor:IReceptor[];

  concepto:IConcepto[];
  conceptos:  Array<IConcepto> = [];

  Ubicaciones:[];
  ubicacion: Array<any> = [];
  mercancia: Array<any> = [];
  
 
  localidad:string;
  clave_estado:string;

  PesoBrutoTotal:number;

  ClaveProdServ:string;
  descripcion:string;
  ClaveUnidad:string;
  MaterialPeligroso:string;
  CveMaterialPeligroso:string;
  Embalaje:string;

  displayedColumns: string[] = ['ClaveProdServ', 'ClaveUnidad', 'Cantidad', 'Unidad',  'Descripcion'];
  displayedColumns1: string[] =  ['rfc', 'fecha', 'direccion',  'cp', 'distancia'];
  
  dataSource = [];
  dataSourceUbication  = [];

  isSaving = false;

  totalDistancia:number=0;

  paisExpedido:string;
  estadoExpedido:string;
  municipioExpedido:string;
  cpExpedido:string;

  paisUbicacion:number;
  estadoUbicacion:string;
  municipioUbicacion:string;
  cpUbicacion:string;

  Unidad:string;

  conceptoUnidad:string;
  conceptoClaveUnidad:string;

 	NumTotalMercancias:number=0;
  PermSCT:string;


  calleTest:any[];

  folio: string;
  serie: string;

  origen:boolean=false;

  @Output()
  auxSave: EventEmitter<boolean> = new EventEmitter();

  @Input()
  parentForm?: FormGroup;

  @Output()
  formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  ELEMENT_DATA: UbicacionElementTable[] = [];
  dataSource1 = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatTable) table: MatTable<CargaElementTable>;
  @ViewChild(MatTable) tableUbicacion: MatTable<UbicacionElementTable>;

  
  constructor(
    private fb: FormBuilder,
    private catPaisesService: CatPaisesService,
    private catEstadosService: CatEstadosService,
    private catMunicipiosService: CatMunicipiosService,
    private catCPsService: CatCPService,
    private catTipoUnidadService: CatTipoUnidadService,
    private emisorService: EmisorService,
    private receptorService:ReceptorService,
    private catTipoFiguraTransporteService:CatTipoFiguraTransporteService,
    private catTipoPermisoService:CatTipoPermisoService,
    private catTipoRemolqueService:CatTipoRemolqueService,
    private catTipoProductoService:CatTipoProductoService,
    private catTipoListaService:ListaService,
    private eamFlotaService:EamFlotaService,
    private clienteService:ClienteService, 
    protected accountService: AccountService,
    private _liveAnnouncer: LiveAnnouncer,
    private generarCartaService: GenerarCartaService,
    private materialPeligrosoService: MaterialPeligrosoService,
    private domicilioFiscalService:DomicilioFiscalService,
    protected activatedRoute: ActivatedRoute,
    private monitorService:MonitoreoService

    ) { }

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
    this.activatedRoute.params.subscribe(params => {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      this.emisorService
    .query({ size: MaxItems },  (this.hasRol([Authority.DMC]) === true ? 2 : 1))
    .pipe(
        map((res: HttpResponse<IEmisor[]>) => {
            return res.body ? res.body : [];
        })
    )
    .subscribe((resBody: IEmisor[]) => (this.emisor = resBody));

    this.catPaisesService
    .query({ size: MaxItems },  (this.hasRol([Authority.DMC]) === true ? 2 : 1))
    .pipe(
        map((res: HttpResponse<ICatPaises[]>) => {
            return res.body ? res.body : [];
        })
    )
    .subscribe((resBody: ICatPaises[]) => (this.catPaises = resBody));

    this.catTipoUnidadService
    .query({ size: MaxItems },  (this.hasRol([Authority.DMC]) === true ? 2 : 1))
    .pipe(
        map((res: HttpResponse<ICatTipoUnidad[]>) => {
            return res.body ? res.body : [];
        })
    )
    .subscribe((resBody: ICatTipoUnidad[]) => (this.catTipoUnidad = resBody));


    this.catTipoPermisoService
    .query({ size: MaxItems },  (this.hasRol([Authority.DMC]) === true ? 2 : 1))
    .pipe(
        map((res: HttpResponse<ICatTipoPermiso[]>) => {
            return res.body ? res.body : [];
        })
    )
    .subscribe((resBody: ICatTipoPermiso[]) => (this.catTipoPermiso = resBody));

    this.catTipoRemolqueService
    .query({ size: MaxItems },  (this.hasRol([Authority.DMC]) === true ? 2 : 1))
    .pipe(
        map((res: HttpResponse<ICatTipoRemolque[]>) => {
            return res.body ? res.body : [];
        })
    )
    .subscribe((resBody: ICatTipoRemolque[]) => (this.catTipoRemolque = resBody));

    this.catTipoProductoService
    .query({ size: MaxItems },  (this.hasRol([Authority.DMC]) === true ? 2 : 1))
    .pipe(
        map((res: HttpResponse<ICatTipoProducto[]>) => {
            return res.body ? res.body : [];
        })
    )
    .subscribe((resBody: ICatTipoProducto[]) => (

        this.catTipoProducto = resBody
        
    ));

    this.catTipoListaService.query({ size: MaxItems },  "TIPO_HORARIO")
    .pipe(
        map((res: HttpResponse<ICatLista[]>) => {
            return res.body ? res.body : [];
        })
    )
    .subscribe((resBody: ICatLista[]) => (
        this.tipoHorario = resBody
        
    ));

    this.catTipoFiguraTransporteService
    .query({ size: MaxItems },  (this.hasRol([Authority.DMC]) === true ? 2 : 1))
    .pipe(
        map((res: HttpResponse<ICatTipoFiguraTransporte[]>) => {
            return res.body ? res.body : [];
        })
    )
    .subscribe((resBody: ICatTipoFiguraTransporte[]) => (this.catTipoFiguraTransporte = resBody));


      // console.log('params: ', params);
      this.serie = params.id;
      this.folio = params.id;

      console.log("AQUI");
      console.log(params.folio);
      if(params.folio){
        this.monitorService.findMotivo('T', '00000314')
        .pipe(
            map((res: HttpResponse<any>) => {
                return res.body ? res.body : [];
            })
        )
        .subscribe((resBody: any) => (
          this.generarCarta = resBody,
          console.log(this.generarCarta.CartaPorte.Conceptos),
         
          //Emisor
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
          
          //Unidad y Transporte
          this.generarCarta.CartaPorte.Ubicaciones.Ubicacion.forEach(function (value) {
            console.log(value)
          }),
         
          Swal.close()
          
          
      
        ))
         
      }else{
        Swal.close()
      }
       
    });

  }


  addData() {

    this.PesoBrutoTotal +=Number(this.editForm.controls['PesoEnKg'].value);
    this.NumTotalMercancias +=Number(this.editForm.controls['Cantidad'].value); 
    this.cargaElementList = {
      ClaveProdServ: ""+this.ClaveProdServ, 
      Cantidad:Number(this.editForm.controls['Cantidad'].value),
      ClaveUnidad: this.ClaveUnidad, 
      Unidad: this.Unidad,
      Descripcion: this.descripcion,
      ValorUnitario: 0,
      Importe: 0,

    };

    this.cargaMercancia = {
      BienesTransp: ""+this.ClaveProdServ, 
      Cantidad:parseInt(this.editForm.controls['Cantidad'].value),
      Unidad: this.Unidad,
      Descripcion: this.descripcion,
      ClaveUnidad: this.ClaveUnidad, 
      PesoEnKg: parseInt(this.editForm.controls['PesoEnKg'].value),
      MaterialPeligroso:this.MaterialPeligroso,
      CveMaterialPeligroso:this.CveMaterialPeligroso,
      Embalaje:this.Embalaje,
    };

    

    this.cargaMercancias  = {
      PesoBrutoTotal:this.PesoBrutoTotal,
      UnidadPeso:"KGM",
      NumTotalMercancias:1,
      Mercancia: [this.cargaMercancia],
    }; 

    this.mercancia.push(this.cargaMercancia);
   
   
    this.conceptos.push(this.cargaElementList);
    this.dataSource.push(this.cargaElementList);
    this.table.renderRows();

    console.log(this.cargaElementList);

    console.log(this.cargaMercancia);
  }


  addDataUbicacion() {
    if(this.origen == false){
      let tmpDate = this.editForm.controls['FechaSalida'].value;
      const datepipe: DatePipe = new DatePipe('en-US')
      let formattedDate = datepipe.transform(tmpDate, 'YYYY-MM-dd')+'T12:55:50';
      let aux = {
        TipoUbicacion:"Origen",
        RFCRemitenteDestinatario:this.editForm.controls['RFCRemitenteDestinatario'].value,
        IDUbicacion:this.editForm.controls['IDUbicacion'].value,
        FechaHoraSalidaLlegada: formattedDate, 
        DistanciaRecorrida:null,
        Domicilio:this.domicilio
      };
  
      this.ubicacion.push(aux);
      this.origen= true;
    }  

    let tmpDate = this.editForm.controls['FechaSalidaLlegada'].value;
    let tmpTime = this.editForm.controls['HoraLlegada'].value;
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(tmpDate, 'YYYY-MM-dd')+'T12:55:50';
    let formattedTime = datepipe.transform(tmpTime, 'THH:mm');
    console.log("FECHASS");
    console.log(formattedTime);
    console.log(formattedDate);
    console.log(this.editForm.controls['HoraLlegada'].value);

    this.ubicacionElementList = {
      rfc: this.editForm.controls['RFCRemitenteDestinatario'].value, 
      fecha:   formattedDate,
      direccion:  this.domicilio.Estado,
      cp:  this.editForm.controls['CodigoPostalUbicacion'].value,
      distancia:  this.editForm.controls['DistanciaRecorrida'].value,
    };

    this.dataSource1.data.push(this.ubicacionElementList);
    this.dataSource1.sort = this.sort;

    this.domicilio.Pais  = this.paisUbicacion;
    this.domicilio.Municipio = this.municipioUbicacion;
    this.domicilio.Estado = this.estadoUbicacion;
    this.domicilio.CodigoPostal = this.editForm.controls['CodigoPostalUbicacion'].value;

    this.totalDistancia += Number(this.editForm.controls['DistanciaRecorrida'].value); 

    let aux = {
      TipoUbicacion:"Destino",
      RFCRemitenteDestinatario:this.editForm.controls['RFCRemitenteDestinatario'].value,
      IDUbicacion:this.editForm.controls['IDUbicacion'].value,
      FechaHoraSalidaLlegada: formattedDate, 
      DistanciaRecorrida: Number(this.editForm.controls['DistanciaRecorrida'].value),
      Domicilio:this.domicilio
    };

    this.ubicacion.push(aux);

    console.log("UBICACION");
    console.log(this.totalDistancia);
    console.log(this.ubicacion);
    
    

  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }

  removeDataUbicacion() {
    this.dataSource.pop();
    this.table.renderRows();
  }


  onSelectEvent(value: any, type:string){
    console.log(value);
    
    switch (type) {
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
                        if(resBody.EstatusEco == 'ACTIVO'){
                            this.editForm.controls['AnioModeloVM'].setValue(resBody.AnioCP);
                            this.editForm.controls['PlacaVM'].setValue(resBody.PlacaCP);
                            this.editForm.controls['PolizaRespCivil'].setValue(resBody.PolizaCP);
                            this.editForm.controls['AseguraRespCivil'].setValue(resBody.AseguradoraCP);
                            this.editForm.controls['NumPermisoSCT'].setValue(resBody.NoPermisoCP);
                            this.editForm.controls['PermSCT'].setValue(resBody.TipoPermisoCP);
                        }else{
                            this.statusFlota = true;
                        }
                        Swal.close();
                        
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
          .query({ size: MaxItems },  (this.hasRol([Authority.DMC]) === true ? 2 : 1))
          .pipe(
              map((res: HttpResponse<IReceptor[]>) => {
                  return res.body ? res.body : [];
              })
          )
          .subscribe((resBody: IReceptor[]) => (this.receptor = resBody));
             
                
          
          Swal.close()
          break;
        case "rfcreceptor": 
            
            this.editForm.controls['RfcReceptor'].setValue(value.Rfc);
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
                  Pais:  this.domFiscal[0].Pais,
                  CodigoPostal: this.domFiscal[0].CodigoPostal,
            
                };
         
        break; 
        case "clavecliente":
          Swal.fire({ 
            allowOutsideClick: false,
            text: 'Cargando...',
          });
          Swal.showLoading();
          this.editForm.controls['RFCRemitenteDestinatario'].setValue(this.emisor_g.Rfc);
          this.editForm.controls['RFCDestino'].setValue("XAXX010101000");
         
          
          
          Swal.close();
                                
            // this.clienteService.find(this.editForm.controls['ClaveBodega'].value,this.editForm.controls['ClaveCliente'].value)
            // .pipe(
            //         map((res: HttpResponse<ICliente>) => {
            //             return res.body ? res.body : [];
            //         })
            //         )
            //         .subscribe((resBody: ICliente) => {
            //           this.editForm.controls['RFCRemitenteDestinatario'].setValue("XAXX010101000");
            //           //this.editForm.controls['CodigoPostalUbicacion'].setValue(resBody.CodigoPostal);
            //           this.catCPsService.findByCodigoPostal(resBody.CodigoPostal)
            //           .pipe(map((res: HttpResponse<ICatCP>) => {
            //                       return res.body ? res.body : [];
            //                   })
            //                   )
            //                   .subscribe((resBodyCp: ICatCP) => {
            //                     this.editForm.controls['PaisUbicacion'].setValue(1);
            //                     this.editForm.controls['EstadoUbicacion'].setValue(resBodyCp[0].Estado);
            //                     this.editForm.controls['MunicipioUbicacion'].setValue(resBodyCp[0].Municipio);
                                
            //                     let tmpDate = this.editForm.controls['FechaSalida'].value;
            //                     const datepipe: DatePipe = new DatePipe('en-US')
            //                     let formattedDate = datepipe.transform(tmpDate, 'YYYY-MM-dd')+'T12:55:50';
            //                     let aux = {
            //                       TipoUbicacion:"Origen",
            //                       RFCRemitenteDestinatario:this.editForm.controls['RFCRemitenteDestinatario'].value,
            //                       IDUbicacion:this.editForm.controls['IDUbicacion'].value,
            //                       FechaHoraSalidaLlegada: formattedDate, 
            //                       DistanciaRecorrida:null,
            //                       Domicilio:this.domicilio
            //                     };
                            
            //                     this.ubicacion.push(aux);
                                
            //                     Swal.close();
                                  
            //                     });
                        
            //           });
          break  
        case "catTipoProducto":
          console.log(value);
          Swal.fire({ 
            allowOutsideClick: false,
            text: 'Cargando...',
          });
          Swal.showLoading();
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
         
          if(value.MaterialPeligroso == "Sí"){
            console.log("Material Peligroso");
            console.log(value.MaterialPeligroso);
            this.materialPeligrosoService
            .query({ size: MaxItems },  (this.hasRol([Authority.DMC]) === true ? 2 : 1))
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
              this.CveMaterialPeligroso=this.materialPeligroso[0].ClaveProducto,
              this.Embalaje=this.materialPeligroso[0].Embalaje
              ));
          }else{
            this.MaterialPeligroso =null;
            this.CveMaterialPeligroso=null;
            this.Embalaje=null;
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
        default:
          console.log("No such day exists!");
        break;
    }
  }


  hasRol(authorities: string[] | string): boolean {
    return this.accountService.hasAnyAuthority(authorities);
  }


  saveData(timbrado:boolean){

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
    this.generarCarta.Fecha = "2022-03-15T11:00:30";
    this.generarCarta.FormaPago =null;
    this.generarCarta.SubTotal = 0;
    this.generarCarta.Moneda = "XXX";
    this.generarCarta.Total = 0;
    this.generarCarta.TipoDeComprobante = "T";
    this.generarCarta.LugarExpedicion = this.editForm.controls['CodigoPostal'].value;
    /**
     * expedido
     */

     this.ExpedidoEn = {
      Municipio: this.municipioExpedido,
      Estado: this.estadoExpedido,
      Pais: this.paisExpedido,
      CodigoPostal: this.editForm.controls['CodigoPostal'].value,

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
    //  console.log('####CONCEPTOS#####');
    this.generarCarta.Conceptos = this.conceptos;

    // /**
    //  * OBSERVACIONES
    // */
     this.Observaciones = [{
      Numero: 1,
      Tema: 'PAG',
      Texto: '',

    }];
    this.generarCarta.Observaciones = this.Observaciones;
    // /**
    //  ****************** CARTA PORTE *********************
    /**
     * ubicaciones 
     */
    
   // this.CartaPorte.Ubicaciones.push(this.ubicacion);
    
    // */
    // // /**
    // //  * OPERADOR
    // //  */
    this.operador.TipoFigura = this.editForm.controls['TipoFigura'].value;
    this.operador.RFCFigura = this.editForm.controls['RFCFigura'].value;
    this.operador.NombreFigura = this.editForm.controls['NombreFigura'].value;
    this.operador.NumLicencia = this.editForm.controls['NumLicencia'].value;
    this.TiposFigura = this.operador;

     /**
     * AUTOTRANSPORTE
     */
      this.Seguros = {
        AseguraRespCivil:this.editForm.controls['AseguraRespCivil'].value,
        PolizaRespCivil:  this.editForm.controls['PolizaRespCivil'].value,
  
      };
  
      this.IdentificacionVehicular = {
        AnioModeloVM:this.editForm.controls['AnioModeloVM'].value,
        PlacaVM: this.editForm.controls['PlacaVM'].value,
        ConfigVehicular: "C2",
      };
  
      this.Autotransporte = {
        NumPermisoSCT:this.editForm.controls['NumPermisoSCT'].value,
        PermSCT:this.PermSCT,//this.editForm.controls['PermSCT'].value,
        IdentificacionVehicular: this.IdentificacionVehicular,
        Seguros: this.Seguros
      };
      
  
      //this.CartaPorte.Autotransporte = this.Autotransporte;
     
    let aux = {Ubicacion: this.ubicacion};
    let auxFigura = {TiposFigura: [this.TiposFigura]};
    let auxMerc = {
      PesoBrutoTotal:this.PesoBrutoTotal,
      UnidadPeso:"kg",
      NumTotalMercancias:this.NumTotalMercancias,
      Mercancia: this.mercancia,
      Autotransporte:this.Autotransporte
    };
    
    this.CartaPorte  = {
      Version:"2.0",
      TranspInternac:"No",
      TotalDistRec:this.totalDistancia,
      Ubicaciones: aux,
      Mercancias: auxMerc,
      FiguraTransporte:auxFigura
    };

    this.generarCarta.CartaPorte = this.CartaPorte ;
    let tmpDateFechaSalida = this.editForm.controls['FechaSalida'].value;
    let tmpDateFechaLlegada = this.editForm.controls['FechaSalidaLlegada'].value;
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDateFechaSalida = datepipe.transform(tmpDateFechaSalida, 'YYYY-MM-dd')+'T12:55:50';
    let formattedDateFechaLlegada = datepipe.transform(tmpDateFechaLlegada, 'YYYY-MM-dd')+'T12:55:50';
    console.log(this.editForm.controls['HoraLlegada'].value);
    let generarCataAux = {
      UsuarioCreador: "4",
      DestinatariosCorreo: this.editForm.controls['Correo'].value,
      FechaSalidaOrigen: formattedDateFechaSalida,
      FechaLlegadaDestino: formattedDateFechaLlegada,
      CartaPorte:this.generarCarta
    };

     
     console.log(generarCataAux);
     this.subscribeToSaveResponse(this.generarCartaService.create(generarCataAux, timbrado));
   

    //this.subscribeToSaveResponse(this.generarCartaService.create(this.generarCarta));
    
    
  }

  private createFromForm(): IGenerarCata {
    return {
      ...this.editForm.value
    };
  }


  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = true;
    if (this.auxSave) {
      this.auxSave.emit(true);
      Swal.close();
      Swal.fire({
        icon: 'success',
        timer: 1500,
      });
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
