import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { StorageService } from '../common/services/storage.service';
import { MemberListing } from './member-listing.model';
import { CommonService } from '../common/services/common.service';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { Globals } from '../globals';
import * as $ from 'jquery';

@Component({
  selector: 'app-member-listing',
  templateUrl: './member-listing.page.html',
  styleUrls: ['./member-listing.page.scss'],
})
export class MemberListingPage implements OnInit {
  members: any[] = [];
  f: any;
  userInfo: any;
  rootPath: string = '';
  filter: string = "";

  showSearch: boolean = false;

  rowsPerPage: number = 20;
  pageNum: number = 1;

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

    this.f = this.storageService.getObject("f");
    if (this.f !== null && this.f !== undefined) {
      this.getMemberList(this.f);
    }
    else
    {
      this.f = {
        SocSequ : this.userInfo.SocSequ,
        FlatNo : this.userInfo.FlatNo,
      }
      
      this.getMemberList(this.f);
    }
    this.rootPath = this.commonService.imgUrl;
  }

  ngOnInit() {
  }

  navMemberSingle(m) {
    console.log(m);
    this.storageService.storeObject("m", m);
    this.router.navigate(["profile"]);
  }

  getMemberList(f) {
    let data = {
      rowsPerPage: this.rowsPerPage,
      pageNum: this.pageNum,
      socSequ: f.SocSequ,
      flatNo: f.FlatNo
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getMemberList(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.members = JSON.parse(res.body.toString());
              console.log("members: ", this.members);
            } else {
              this.members = MemberListing.members;
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
