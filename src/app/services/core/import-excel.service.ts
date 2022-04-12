import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'app/../environments/environment';


@Injectable({ providedIn: 'root' })
export class ImportarExcelService {
  public resourceUrl = environment.apiUrlCartaPorte + '/excel/uploadFile';
    
    constructor(private http:HttpClient) { }
 
    // Returns an observable
    upload(params):Observable<any> {
        // Make http post request over api
        // with formData as req
       
        console.log(params)
        return this.http.post(`${this.resourceUrl}/4` , params.formData)
    }
}

