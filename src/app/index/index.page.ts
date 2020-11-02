import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { StorageService } from '../common/services/storage.service';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { Index } from './index.model';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { CommonService } from '../common/services/common.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  userInfo: any;
  isLogged: boolean = false;
  widgets: any;
  rootPath: string = "";
  rowsPerPage: number = 10;
  pageNum: number = 1;
  notifyInfo: any[] = [];
  showLoader: boolean;
  notifyType: any = 1;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private globals: Globals,
    private connectivityService: ConnectivityService,
    private commonService: CommonService,
    private renderer: Renderer2
  ) {
    this.userInfo = this.globals.userInfo;
    if (this.userInfo === null || this.userInfo === undefined) {
      this.router.navigate(["login"]);
    }
    console.log("userInfo: ", this.userInfo);

    this.getWidgets();

    this.rootPath = this.commonService.imgUrl;

  }

  ngOnInit() {
    // this.hideOnScroll();
  }

  ionViewDidEnter() {
    this.getNotification(0);
  }

  onScroll(e) {
    console.log(e);
  }

  hideOnScroll() {
    var prevScrollpos = window.pageYOffset;
    // console.log(prevScrollpos);
    // window.onscroll = function () {
    var currentScrollpos = window.pageYOffset;
    if (prevScrollpos > currentScrollpos) {
      document.getElementById('#ion-head-navbar').style.top = "0";
    } else {
      document.getElementById('#ion-head-navbar').style.top = "-50";
    }
    prevScrollpos = currentScrollpos;
    // }
  }

  getWidgets() {
    let data = {
      UserCode: this.userInfo.UserCode
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getWidgets(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.widgets = JSON.parse(res.body.toString());
              console.log("widgets: ", this.widgets);
            } else {
              this.widgets = Index.widgets;
            }
          }
        }, (err => {
          if (err.status === 0) {
            console.log(err);
          } else {
            console.log(err);
          }
        })
      );
    } else {
      alert("Please Check Your Network!");
    }
  }
  lastX: any;
  scrollEv(event) {
    if (event.detail.scrollTop > Math.max(600, this.lastX)) {
      // $('#ion-head-navbar').removeClass("show");
      // $('#ion-head-navbar').addClass("hide");
      $('#ion-head-navbar').removeClass("fadein").addClass("fadeout");
      // $('.hero-wrapper').removeClass("push").addClass("pull");
    } else if (event.detail.scrollTop <= Math.max(0, 600)) {
      // $('#ion-head-navbar').removeClass("hide");
      // $('#ion-head-navbar').addClass("show");
      $('#ion-head-navbar').removeClass("fadeout").addClass("fadein");
      // $('.hero-wrapper').removeClass("pull").addClass("push");
    }

    this.lastX = event.detail.scrollTop;
  }

  navWidget(w: any) {
    // if (w.widgetName.toLowerCase() == "notices") {
    //   this.router.navigate(["notices"]);
    // } else if (w.widgetName.toLowerCase() == "accounts") {
    //   this.router.navigate(["billing"]);
    // } else if (w.widgetName.toLowerCase() == "reports") {
    //   this.router.navigate(["reports"]);
    // } else if (w.widgetName.toLowerCase() == "notifications") {
    //   this.router.navigate(["notifications"]);
    // } else if (w.widgetName.toLowerCase() == "events") {
    //   this.router.navigate(["events"]);
    // }

    let widgetName = w.widgetName.toLowerCase();
    switch (widgetName) {
      case "notices":
        this.router.navigate(["notices"]);
        break;
      case "events":
        this.router.navigate(["events"]);
        break;
      case "members":
        this.router.navigate(["member-listing"]);
        break;
      case "flat listing":
        this.router.navigate(["flat-listing"]);
        break; 
      case "society":
        this.router.navigate(["society-listing"]);
        break;
      case "gallery":
        console.log("It is a gallery.");
        break;
      case "reports":
        this.router.navigate(["reports"]);
        break;
      case "helpdesk":
          console.log("It is a helpdesk.");
          break;
      case "contact support":
        console.log("It is a contactsupport.");
        break;
      case "accounts":
        this.router.navigate(["billing"]);
        break; 
      case "notifications":
        this.router.navigate(["notifications"]);
        break;    
      case "forums":
        console.log("It is a forums.");
        break; 
      case "visitor management":
        console.log("It is a visitormgmt.");
        break; 
      case "daily staff management":
        console.log("It is a staffmgmt.");
        break;  
      case "child security":
        console.log("It is a childsecurity.");
        break;  
      case "delivery management":
        console.log("It is a deliverymgmt.");
        break;  
      default:
          console.log("No such day exists!");
          break;
    }
  }

  getNotification(notifyType: number) {
    let userInfo = this.globals.userInfo;
    let data = {
      rowsPerPage: this.rowsPerPage,
      pageNum: this.pageNum,
      UserCode: userInfo.UserCode,
      notifyType: notifyType
    };
    var networkconnection = this.connectivityService.isOnline();
    if (networkconnection) {
      this.commonService.getNotification(data).subscribe((res) => {
          if (res.status == 200) {
            if (res.body === null || res.body === undefined || res.body === "") {
              this.notifyInfo = [];
            } 
            else {
              this.showLoader = false;
              this.notifyInfo = JSON.parse(res.body.toString());
              // console.log("ns: ", resArray);
              // if (resArray.length > 0) {
              //   for (let i = 0; i < resArray.length; i++) {
              //     let o = resArray[i];
              //     this.notifyInfo.push(o);
              //   }
              //   if (this.notifyInfo[0].notifyContent == "No records found") {
              //     this.notifyInfo.splice(0, 1);
              //   }
              // }
              console.log("notifyInfo: ", this.notifyInfo);
              this.storageService.storeObject("notifications", this.notifyInfo);
            }
          }
        },
        (err => {
          if (err.status === 0) {
            console.error('Please contact administrator');
          } else {
            console.error(err.message);
          }
        })
      );
    }
    else {
      alert('Please try after sometime when you are online.');
    }
  }

}
