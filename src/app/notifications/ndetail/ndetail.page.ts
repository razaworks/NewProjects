import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { ConnectivityService } from 'src/app/common/services/connectivityCheck.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-ndetail',
  templateUrl: './ndetail.page.html',
  styleUrls: ['./ndetail.page.scss'],
})
export class NdetailPage implements OnInit {
  notifications: any[] = [];
  userInfo: any;
  rootPath: string = '';
  type: number = 0;
  showSearch: boolean = false;
  isLoaded: boolean = false;
  rowsPerPage: number = 10;
  pageNum: number = 1;
  filter: string = "";
  p: number = 1;
  reqBtnText: string = "";
  notifyType: any = 1;

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
    this.type = this.storageService.getObject("nType");
    if (this.type == null && this.type == undefined) {
      this.location.back();
    } else {
      this.getNotification(this.type);
    }
  }

  getNotification(notifyType: number) {
    let userInfo = this.globals.userInfo;
    let data = {
      rowsPerPage: this.rowsPerPage,
      pageNum: this.pageNum,
      persSequ: userInfo.PersSequ,
      notifyType: notifyType
    };
    var networkconnection = this.connectivityService.isOnline();
    if (networkconnection) {
      this.commonService.getNotification(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res["_body"] == null) {
              this.notifications = [];
            }
            else {
              this.isLoaded = true;
              this.notifications = JSON.parse(res.body.toString());
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
