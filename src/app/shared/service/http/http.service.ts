import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { AutenticationService } from '../autentication/autentication.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient,private autenticationService : AutenticationService, private globalServices: GlobalService, private router: Router) { }



  prepareHttpOption(params) {

    var contentType = 'application/json';
    var myToken = this.autenticationService.getToken();
   
   /* var rspId = authData ?
      sessionStorage.getItem(this.globalServices.selectedResponsibilityKey).toString()
      : '';
      */
    var httpHeaders1= new HttpHeaders({
      'Content-Type': contentType,
      'Authorization': myToken,
      //'RSPID': rspId,
      'Accept': 'q=0.8;application/json;q=0.9',
      /*'Local-IP': this.globalServices.localIP,
      'Remote-IP': this.globalServices.remoteISPIP */
      'Local-IP': this.globalServices.SSOSiteURL,
      'Remote-IP': this.globalServices.api_BaseURL
    })

    var httpHeaders = new HttpHeaders({
      'Content-Type': contentType,
      'Accept': 'q=0.8;application/json;q=0.9'
    })

    if (params) {
      return {
        headers: httpHeaders,
        params: params
      }
    }
    else {
      return {
        headers: httpHeaders
      }
    }
  }

  public get(api: string, params: any = null) {

    var apiUrl = this.globalServices.api_BaseURL + api;
    
    var result = this.httpClient.get(apiUrl, this.prepareHttpOption(params));

    return result;
  }
  public post(api: string, params: any) {
    try {
      let body = JSON.parse(JSON.stringify(params));
      return this.httpClient.post(this.globalServices.api_BaseURL + api, body, this.prepareHttpOption(null));
    }
    catch (ex) {
      return null;
    }
  }
}
