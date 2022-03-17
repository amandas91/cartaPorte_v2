import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
    
  // API url

  public resourceUrl = environment.apiUrl + '/api/payment/upload';
    
  constructor(private http:HttpClient) { }
  
  // Returns an observable
  upload(params):Observable<any> {
      // Make http post request over api
      // with formData as req
      return this.http.post(`${this.resourceUrl}/${params.payment_id}` ,params.formData)
  }
}