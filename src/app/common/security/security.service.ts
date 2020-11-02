import { Injectable, EventEmitter, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

// import { StorageService } from "./../storage/storage.service";

// import { environment } from "../../../../../environments/environment";
import { configuration } from "../properties/config";

@Injectable({
  providedIn: 'root' 
})
export class SecurityService {

  constructor(
    @Inject(HttpClient) private httpClient: HttpClient,
    @Inject(Router) public router: Router
    //@Inject(StorageService) public storageService: StorageService
  ) { }

  fetchHeader(
    contentType: any = "",
    dataType: string = ""
  ): HttpHeaders {
    let headers = new HttpHeaders({});

    if (contentType != "") {
      headers = headers.append('Content-Type', contentType);
    }

    if (dataType != "") {
      headers = headers.append('dataType', dataType);
    }

    //let refreshToken = this.storageService.getObject('refreshToken');
    //let formName = '';

    // if (!this.isNullOrEmpty(this.router.url)) {
    //   let urlSplit = this.router.url.split('/');

    //   formName = urlSplit.pop();
    // }

    //let userName = this.currentUserName();

    //headers = headers.append('refresh_token', this.isNullOrEmpty(refreshToken) ? '' : refreshToken);
    //headers = headers.append('form_name', formName);
    //headers = headers.append('user_name', this.isNullOrEmpty(userName) ? '' : userName);

    return headers;
  }

  private isNullOrEmpty(obj: any) {
    return obj == null || obj == undefined || obj == '';
  }

  extractHeader(headers: HttpHeaders) {
    if (headers.has('refresh_token')) {
      let refToken = headers.get('refresh_token');
      if (!this.isNullOrEmpty(refToken)) {
        //this.storageService.storeObject('refreshToken', refToken);
      }
    }
  }

  currentUserId() {
    let appliView = sessionStorage.getItem('applicantView');
    if(appliView)
    {
      console.log("is Apllicant")
      return "APPLICANT";
      
    }
    else
    {
      console.log("normal")
      return ""; //this.storageService.getObject('loggedInUserId');
    }
   
  }

  currentUserName() {
    let userData = ""; //this.storageService.getObject('loggedInUserData');

    return ""; //userData != null ? userData.userName : '';
  }

  currentUserRoles() {
    let userData = ""; //this.storageService.getObject('loggedInUserData');

    if (userData != null) {
      return ""; //this.isNullOrEmpty(userData.userroles) ? [] : userData.userroles.slice(0);
    } else {
      return [];
    }
  }

  hasRole(roleName: string) {
    let userRoles = this.currentUserRoles();

    let hasDesiredRole = false;

    if (!this.isNullOrEmpty(roleName)) {
      hasDesiredRole = userRoles.indexOf(roleName) != -1;
    }

    return hasDesiredRole;
  }

  currentUserChannelDesignation() {
    let userData = ""; //this.storageService.getObject('loggedInUserData');

    return ""; 
    //  {
    //   channelCode: userData.channelCd,
    //   designationCode: userData.designationCd
    // };
  }
}
