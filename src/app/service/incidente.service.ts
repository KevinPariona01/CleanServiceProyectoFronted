import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidenteService {

  public url: String = '';
  public credentials: any;
  public basic: any;


  constructor(public _http: HttpClient) {
      this.url =  environment.url;
  }

  listarIncidente(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'incidente/listarIncidente', request, { headers: reqHeader });
  } 

  agregarIncidente(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'incidente/agregarIncidente', request, { headers: reqHeader });
  } 

  actualizarIncidente(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'incidente/actualizarIncidente', request, { headers: reqHeader });
  } 

  eliminarIncidente(request:any,token:any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this._http.post(this.url + 'incidente/eliminarIncidente', request, { headers: reqHeader });
  }
  
}
