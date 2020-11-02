import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { StorageService } from '../common/services/storage.service';
import { SocietyListing } from './society-listing.model';
import { CommonService } from '../common/services/common.service';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { Globals } from '../globals';
import * as $ from 'jquery';
import { Location } from '@angular/common';

@Component({
  selector: 'app-society-listing',
  templateUrl: './society-listing.page.html',
  styleUrls: ['./society-listing.page.scss'],
})
export class SocietyListingPage implements OnInit {
  societies: any[] = [];
  userInfo: any;
  rootPath: string = '';
  filter: string = "";

  showSearch: boolean = false;

  rowsPerPage: number = 10;
  pageNum: number = 1;

  p: number = 1;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private commonService: CommonService,
    private connectivityService: ConnectivityService,
    private globals: Globals,
    private location: Location
  ) {
    this.userInfo = this.globals.userInfo;
    if (this.userInfo == null || this.userInfo == undefined) {
      this.router.navigate(["login"]);
    }

    if(this.userInfo != null || this.userInfo != undefined)
    {
      if(this.userInfo.RoleName.toLowerCase() === "superadmin"){
        // this.societies = SocietyListing.societies;
        this.rootPath = this.commonService.imgUrl;
        this.getSocietyList();
      }
      else
      {
        //this.router.navigate(["unautohrised"]);
        alert("unauthorized access");
        this.location.back();
      }
    }
    
  }

  ngOnInit() {
  }

  navFlats(s) {
    console.log(s);
    let ne: NavigationExtras = {
      queryParams: { "s": s }
    }
    this.storageService.storeObject("s", s);
    this.router.navigate(["flat-listing"]);
  }

  getSocietyList() {
    let data = {
      rowsPerPage: this.rowsPerPage,
      pageNum: this.pageNum
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getSocietyList(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.societies = JSON.parse(res.body.toString());
              console.log("societies: ", this.societies);
            } else {
              this.societies = SocietyListing.societies;
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

  search(e) {
    console.log(e);
    let arr: any[] = [];
    let bfarr: any[] = [];
    let searchArr: any[] = [];
    if (bfarr == []) {
      bfarr = this.societies;
    } else {

    }
    this.societies.forEach((s) => {

    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;

    if (!this.showSearch) {
      this.filter = '';
    }
  }

  pageChanged(e) {
    const pp = this.p;
    this.p = e;
    if (pp < this.p) {

    } else if (pp > this.p) {

    }
  }

}
