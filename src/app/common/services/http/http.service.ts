import { Injectable, EventEmitter, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

//import { Observable } from 'rxjs/Observable';
//import { map } from 'rxjs/operators';

// import { MasterData } from './../../json/masterData-json';
// import { draftSaveJSON } from './../../json/draftSave-json';

import { configuration } from "./../../properties/config";
import { Router } from '@angular/router';

import { HttpModel } from "./../../models/httpModel";

// import { environment } from "../../../../../environments/environment";

import { SecurityService } from "../../security/security.service";

@Injectable({
  providedIn: 'root' 
})
export class HttpService {

  constructor(
    @Inject(HttpClient) private httpClient: HttpClient,
    @Inject(Router) public router: Router,
    @Inject(SecurityService) public securityService: SecurityService
  ) {}

  //invokeHttp(httpObj: HttpModel): Observable<HttpResponse<Object>> {
  invokeHttp(httpObj: HttpModel) {
    //let serviceURL = environment.partialServiceURL + httpObj.partialURL;
    let serviceURL = "http://localhost:53935/api/" + httpObj.partialURL;

    if (httpObj.callType == configuration.callType.GET) {
      return this.httpClient.get(serviceURL, {
        headers:this.securityService.fetchHeader(),
        observe: 'response'
      });
    } else {
      return this.httpClient.post(serviceURL, httpObj.dataJSON, {
        headers: this.securityService.fetchHeader(),
        observe: 'response'
      });
    }
  }

  fetchToken(httpObj: HttpModel) {
    //let serviceURL = environment.partialServiceURL + httpObj.partialURL;
    let serviceURL = httpObj.partialURL;
    let contentType = "application/x-www-form-urlencoded";
    let dataType = "";
    return this.httpClient.post(serviceURL, httpObj.dataJSON, {
      headers: this.securityService.fetchHeader(contentType)
    });
  }
}
