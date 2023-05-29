import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  public url: String = '';
  public credentials: any;
  public basic: any;


  constructor(public _http: HttpClient) {
      this.url =  environment.url;
  }

  listarPeriodo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'periodo/listarPeriodo', request, { headers: reqHeader });
  } 

  agregarPeriodo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'periodo/agregarPeriodo', request, { headers: reqHeader });
  } 

  actualizarPeriodo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'periodo/actualizarPeriodo', request, { headers: reqHeader });
  } 

  eliminarPeriodo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'periodo/eliminarPeriodo', request, { headers: reqHeader });
  }

  estadoPeriodo(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'periodo/estadoPeriodo', request, { headers: reqHeader });
  }

  listarPeriodoActivos(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'periodo/listarPeriodoActivos', request, { headers: reqHeader });
  }

}
