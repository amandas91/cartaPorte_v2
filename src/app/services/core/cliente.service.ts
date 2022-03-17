import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { ICliente } from 'app/models/core/cliente.model';


type EntityResponseType = HttpResponse<ICliente>;
type EntityArrayResponseType = HttpResponse<ICliente[]>;

@Injectable({ providedIn: 'root' })
export class ClienteService {

public resourceUrl = environment.apiUrlCartaPorte + '/clientes';

constructor(protected http: HttpClient) {}

    find(claveBodega: string, claveCliente: string): Observable<EntityResponseType> {
        return this.http.get<ICliente>(`${this.resourceUrl}/${claveBodega}/${claveCliente}`, { observe: 'response' });
    }

    query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    //console.log('---> test: ' )
    const options = createRequestOption(req);

    return this.http.get<ICliente[]>(`${this.resourceUrl}`, {  observe: 'response' });
    }

}
