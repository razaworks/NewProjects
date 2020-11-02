import { Injectable, Inject } from '@angular/core';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { reduceEachTrailingCommentRange } from 'typescript';
import { HttpService } from './http/http.service';
import { configuration } from '../../common/properties/config';
import { HttpModel } from "../../common/models/httpModel";

@Injectable()
export class CommonService {
    // serviceUrl:any="http://192.168.0.104:53935/api";
    imgUrl: any = "http://localhost:53935";
    // imgUrl: any = "http://sage.razaworks.com";
    // serviceUrl: any = "http://localhost:53935/api";
    // domain: string = "http://sage.razaworks.com";
    domain: string = "http://localhost:53935";
    serviceUrl: any = this.domain + "/api";
    userName: any = '';
    ti: any;
    constructor(
        //public http: Http,
        public http: HttpClient,
        public ionicStorage: Storage,
        public router: Router,
        private httpService: HttpService,
    ) {
        let token = localStorage.getItem("access_token");
        if (token === null || token === undefined || token === '') {
            this.router.navigate(["login"]);
        }
    }

    validateUser(data: any) {
        let postURL =  '/login/loginDetail';
        return this.http.post(postURL, data);
    }

    getOTP(data: any) {

        //return this.fetchToken(data);
        //return this.getToken(data);
        //var hdr = new Headers({ 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*", 'Access-Control-Allow-Methods': "POST, GET, OPTIONS, PUT" });
        //////////////let hdr = new Headers();
        //hdr.append('Content-Type', 'application/x-www-form-urlencoded');
        /////////////hdr.append('Content-Type', 'application/json');

        //hdr.append('Access-Control-Allow-Origin', '*');
        ///////////let postURL =  '/Login/SendOTP';
        //return this.http.post(postURL, data, { headers: hdr });

        //let postURL = 'http://localhost:53935/api/UserMaster/SendOTP';
        //let postURL = 'http://localhost:53935/token';
        //return this.http.post(postURL, data, { headers: hdr });
        
        
        /////////////////return this.http.post(postURL, data);

        // let hdr1 = new Headers();
        // hdr1.append('Content-Type', 'application/x-www-form-urlencoded');

        // let params = {
        //     "mobileNo": data.mobileNo,
        //     "otpCode": "",
        //     "email": "",
        //     "isRegenOTP": false
        //   };
        //   return this.http.post(postURL, data, { headers : hdr1});


        let postURL = '/Login/SendOTP';
        ///var reqHeader = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        //return this.http.post(postURL, inputData, { headers: reqHeader });
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);


    }


    getToken(data: any) {
        //var hdr = new Headers({ 'Content-Type': "application/json", 'Access-Control-Allow-Origin': "*", 'Access-Control-Allow-Methods': "POST, GET, OPTIONS, PUT" });
        let hdr = new Headers();
        hdr.append('Content-Type', 'application/x-www-form-urlencoded');

        //hdr.append('Content-Type', 'application/json');

        //hdr.append('Access-Control-Allow-Origin', '*');
        //let postURL =  '/UserMaster/SendOTP';
        //return this.http.post(postURL, data, { headers: hdr });


        var dt = {
            grant_type: 'password',
            username: '9022377115',
            password: 'MTUyNg=='
        }

        //var dt1 = 'grant_type=password&username=myuser@user.com&password=mypass';
        var dt1 = 'grant_type=password&username=9022377117&password=MTUyNg==';

        //let postURL = 'http://localhost:53935/api/UserMaster/SendOTP';
        //let postURL = 'http://localhost:53935/token';
        let postURL = this.domain + '/token';
        //return this.http.post(postURL, dt1, { headers: hdr });
        return this.http.post(postURL, dt1);

        // //let postURL =  '/UserMaster/SendOTP/';
        // //let postURL = 'http://sage.razaworks.com/api/token';
        // //let postURL = 'http://localhost:53935/api/UserMaster/SendOTP';
        // let postURL = 'http://localhost:53935/token';
        // return this.http.post(postURL, dt);
    }

    sendEmailandOTP(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/sendEmailandOTP';
        // //return this.http.post(postURL, data, { headers: hdr })
        // return this.http.post(postURL, data);


        let postURL =  '/UserMaster/sendEmailandOTP';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }
    getInviteOTP(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/SendInviteOTP';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/SendInviteOTP';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    verifyUser(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/LoginUser';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);


        let postURL =  '/UserMaster/LoginUser';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    checkUser(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/CheckUser';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/CheckUser';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    setPass(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/SetPass';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/SetPass';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    verifyInvitationCode(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/verifyInvitationCode';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/verifyInvitationCode';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    registerSociety(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/RegisterSociety';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/RegisterSociety';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    addMember(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/AddMember';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/AddMember';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    getMember(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/GetMember';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/GetMember';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    getSocietyList(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/GetSocietyList';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL = '/UserMaster/GetSocietyList';
        ///var reqHeader = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        //return this.http.post(postURL, inputData, { headers: reqHeader });
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    getFlatList(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/GetFlatList';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/GetFlatList';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    getMemberList(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/GetMemberList';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/GetMemberList';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    getMemberTypes(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/GetMemberTypes';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/GetMemberTypes';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    getWidgets(data: any) {
        // let token = localStorage.getItem("access_token");
        // let access_token = "Bearer " + token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': access_token });
        // let postURL =  '/UserMaster/GetWidgets';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/GetWidgets';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    makePayment(sequence: any, gateway: any) {
        let serviceUrl =  '/payment/makePayment/' + sequence + '/' + gateway;

        //return this.http.get(serviceUrl, JSON.stringify({}));
        return this.http.get(serviceUrl);
    }
    // verifyOTP(aadharNum: string, enteredOTP: string) {
    //     // let serviceURL =  '/onBoarding/verifyOTP';

    //     // let enteredData = {
    //     //     "userId": aadharNum,
    //     //     "otpPin": enteredOTP,
    //     //     "requestType": "AadharVerification"
    //     // };

    //     return this.http.post(serviceURL, enteredData);

    //     let postURL =  '/onBoarding/verifyOTP';
    //     let httpObj = new HttpModel(
    //         postURL,
    //         data,
    //         configuration.callType.POST
    //       );
    //     return this.httpService.invokeHttp(httpObj);
    // }

    // uploadDocument(uploadData: any) {
    //     let postURL =  "/onBoarding/uploaddocs/";
    //     let data = uploadData;
    //     //var header: Headers = new Headers();
    //     //header.append('user_name', (loggeduser.userName != null || loggeduser.userName != undefined) ? loggeduser.userName:'');
    //     //header.append('user_name', (this.userName != null || this.userName != undefined) ? this.userName : '');
    //     //var options: RequestOptions = new RequestOptions({ headers: header });
    //     //return this.http.post(postURL, data, options);
    //     return this.http.post(postURL, data);
    // }

    // saveProfileDetails(inputData: any) {
    //     let serviceURL =  '/UserMaster/SaveProfileDetails';
    //     //var header: Headers = new Headers();
    //     //header.append('user_name', (this.userName != null || this.userName != undefined) ? this.userName : '');
    //     //var options: RequestOptions = new RequestOptions({ headers: header });

    //     return this.http.post(serviceURL, inputData);
    // }

    // documentinsert(column, dcfintdata, data, syncStatus) {
    //     //let query = `insert or replace into dcf_document(` + column + `) values ('` + dcfintdata + `','` + data + `','` + syncStatus + `')`
    //     let query = `insert or replace into dcf_document(` + column + `) values (?,?,?)`
    //     return this.fc.sql(query, [dcfintdata, JSON.stringify(data), syncStatus]).then(function (result) {
    //         //return this.fc.sql(`insert or replace into dcf_intermediary_data(` + column + `) values ('` + data+`','`+mobilesync + `','`+userid + `')`, []).then(function (result) {
    //         return result;
    //     }).catch(function (ex) {
    //         console.error('Error fetching Result', ex);
    //     });
    // }

    // documentselect(dcfintdata) {
    //     let query = 'select * from dcf_document where dcfIntermediaryDataId = ? '
    //     return this.fc.sql(query, [dcfintdata]).then(function (result) {
    //         return result;
    //     }).catch(function (ex) {
    //         console.error('Error fetching Result', ex);
    //     });

    // }


    // fetchuserDetail() {
    //     let query = 'select userData from user_details'
    //     return this.fc.sql(query, []).then(function (result) {
    //         return result;
    //     }).catch(function (ex) {
    //         console.log('Error fetching document List' + ex);
    //         alert('Error fetching document List' + ex);
    //     });
    // }

    

    sendEmail(data: any) {
        let postURL =  '/UserMaster/MySendEmail';
        return this.http.post(postURL, data);
    }
    fbUpdateProfileDetails(data: any) {
        let postURL =  '/UserMaster/FBUpdateProfileDetails';
        return this.http.post(postURL, data);
    }
    fbUpdateProfile(inputObj: any) {
        let serviceURL =  '/UserMaster/fbUpdateProfile/';
        return this.http.post(serviceURL, inputObj);
    }
    
    fetchToken(inputData: any) {
        let postURL = this.domain + '/token';
        var reqHeader = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        //return this.http.post(postURL, inputData, { headers: reqHeader });
        let httpObj = new HttpModel(
            postURL,
            inputData,
            configuration.callType.POST
          );
        return this.httpService.fetchToken(httpObj);
    }

    getNotices(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Widget/GetNotices';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Widget/GetNotices';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    addNotice(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Widget/AddNotice';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Widget/AddNotice';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    delNotice(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Widget/DelNotice';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Widget/DelNotice';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    editNotice(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Widget/EditNotice';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Widget/EditNotice';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    saveNoticeImage(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Widget/SaveNoticeImage';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Widget/SaveNoticeImage';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    getStatements(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Billing/GetStatements';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Billing/GetStatements';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    saveBillingImage(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Billing/UploadImage';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Billing/UploadImage';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    saveProfilePhoto(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/UserMaster/saveProfilePhoto';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/saveProfilePhoto';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    addPayment(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Billing/AddPayment';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Billing/AddPayment';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    getPayments(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Billing/GetPayments';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Billing/GetPayments';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    getPaymentList(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Billing/GetPaymentList';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Billing/GetPaymentList';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    getGeneratedBills(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Billing/GetGeneratedBills';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Billing/GetGeneratedBills';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    generateBill(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Billing/GenerateBill';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Billing/GenerateBill';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    updateTransStatus(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Billing/UpdateTransStatus';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Billing/UpdateTransStatus';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    getEvents(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Widget/GetEvents';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Widget/GetEvents';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    addEvent(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Widget/AddEvent';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Widget/AddEvent';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    delEvent(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Widget/DelEvent';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Widget/DelEvent';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    editEvent(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Widget/EditEvent';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Widget/EditEvent';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    saveEventImage(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Widget/SaveEventImage';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/Widget/SaveEventImage';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

    getNotification(data: any) {
        // let ti = JSON.parse(localStorage.getItem("ti"));
        // let acc_tok = "Bearer " + ti.access_token;
        // var hdr = new Headers({ 'Content-Type': "application/json", 'Authorization': acc_tok });
        // let postURL =  '/Billing/UploadImage';
        // //return this.http.post(postURL, data, { headers: hdr });
        // return this.http.post(postURL, data);

        let postURL =  '/UserMaster/GetNotification';
        let httpObj = new HttpModel(
            postURL,
            data,
            configuration.callType.POST
          );
        return this.httpService.invokeHttp(httpObj);
    }

}