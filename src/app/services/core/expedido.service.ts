import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { IExpedido } from 'app/models/core/expedido.model';


type EntityResponseType = HttpResponse<IExpedido>;
type EntityArrayResponseType = HttpResponse<IExpedido[]>;

@Injectable({ providedIn: 'root' })
export class ExpedidoService {

public resourceUrl = environment.apiUrlCartaPorte + '/expedido';

constructor(protected http: HttpClient) {}

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IExpedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any, type?:any): Observable<EntityArrayResponseType> {
        
        const options = createRequestOption(req);

        return this.http.get<IExpedido[]>(`${this.resourceUrl}`, {  observe: 'response' });
    }

}
