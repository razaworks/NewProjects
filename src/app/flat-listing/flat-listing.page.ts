import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../common/services/storage.service';
import { FlatListing } from './flat-listing.model';
import { CommonService } from '../common/services/common.service';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { Globals } from '../globals';
import * as $ from 'jquery';

@Component({
  selector: 'app-flat-listing',
  templateUrl: './flat-listing.page.html',
  styleUrls: ['./flat-listing.page.scss'],
})
export class FlatListingPage implements OnInit {
  flats: any[] = [];
  s: any;
  userInfo: any;
  rootPath: string = '';

  showSearch: boolean = false;

  rowsPerPage: number = 20;
  pageNum: number = 1;

  filter: string = "";

  p: number = 1;

  constructor(
    private router: Router,
    private ac: ActivatedRoute,
    private storageService: StorageService,
    private commonService: CommonService,
    private connectivityService: ConnectivityService,
    private globals: Globals
  ) {
    this.userInfo = this.globals.userInfo;
    if (this.userInfo == null || this.userInfo == undefined) {
      this.router.navigate(["login"]);
    }

    this.s = this.storageService.getObject("s");
    if (this.s !== null && this.s !== undefined) {
      this.getFlatList(this.s);
    }
    else{
      this.s = {
        SocSequ : this.userInfo.SocSequ,
        FlatNo : this.userInfo.FlatNo,
      }
      this.getFlatList(this.s);
    }
    this.rootPath = this.commonService.imgUrl;
  }

  ngOnInit() {
  }

  navMembers(f) {
    console.log(f);
    this.storageService.storeObject("f", f);
    this.router.navigate(["member-listing"]);
  }

  getFlatList(s) {
    let data = {
      rowsPerPage: this.rowsPerPage,
      pageNum: this.pageNum,
      socSequ: s.SocSequ
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getFlatList(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.flats = JSON.parse(res.body.toString());
              console.log("flats: ", this.flats);
            } else {
              this.flats = FlatListing.flats;
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

  toggleSearch() {
    this.showSearch = !this.showSearch;

    if (!this.showSearch) {
      this.filter = '';
    }
  }

}
