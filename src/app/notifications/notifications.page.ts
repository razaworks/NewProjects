import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common/services/common.service';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { StorageService } from '../common/services/storage.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: any[] = [];
  userInfo: any;
  rootPath: string = '';
  showSearch: boolean = false;
  isLoaded: boolean = false;
  rowsPerPage: number = 10;
  pageNum: number = 1;
  filter: string = "";
  p: number = 1;
  reqBtnText: string = "";

  constructor(
    private router: Router,
    private storageService: StorageService,
    private commonService: CommonService,
    private connectivityService: ConnectivityService,
    private globals: Globals,
    private location: Location
  ) {
    this.userInfo = this.globals.userInfo;
    if (this.userInfo === null || this.userInfo === undefined) {
      this.router.navigate(["login"]);
    }
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let ntfn = this.storageService.getObject("notifications");
    if (ntfn !== null && ntfn !== undefined) {
      this.notifications = ntfn;
      console.log(this.notifications);
      this.isLoaded = true;
    } else {
      this.location.back();
    }
  }

  getNtfnCount(type: number) {
    let arr: any[] = [];
    this.notifications.forEach((el) => {
      if (el.NotifyType === type && !el.isRead) {
        arr.push(el);
      }
    });
    return arr.length;
  }

  navNotfnDetails(type: number) {
    this.storageService.storeObject("nType", type);
    this.router.navigate(["notifications/detail"]);
  }

}
