import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from '../common/services/common.service';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { StorageService } from '../common/services/storage.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.page.html',
  styleUrls: ['./notices.page.scss'],
})
export class NoticesPage implements OnInit {
  showSearch: boolean = false;
  userInfo: any;
  filter: string = "";
  rootPath: string = '';
  rowsPerPage: number = 10;
  pageNum: number = 1;
  notices: any[] = [];
  p: number = 1;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private commonService: CommonService,
    private connectivityService: ConnectivityService,
    private globals: Globals,
  ) {
    this.userInfo = this.globals.userInfo;
    if (this.userInfo == null || this.userInfo == undefined) {
      this.router.navigate(["login"]);
    }

    // this.getNotices();

    this.rootPath = this.commonService.imgUrl;
  }

  ionViewDidEnter() {
    this.getNotices();
    console.log("ion view did enter");
  }

  ngOnInit() {
    let nna = this.storageService.getObject("new_notice_added");
    if (nna) {
      this.getNotices();
    }
    let noticedited = this.storageService.getObject("notice_edited");
    // if (noticedited !== null) {
    //   let i = this.notices.findIndex(i => { return (i.noticeSequ === noticedited.noticeSequ) });
    //   this.notices.forEach((el) => {
    //     if (el.noticeSequ === i) {
    //       el.noticeTitle = noticedited.noticeTitle;
    //       el.noticeDesc = noticedited.noticeDesc;
    //       // el.noticeImg = noticedited.noticeImg;
    //     }
    //   });
    // }
    // this.getNotices();
    console.log("on init");
  }

  ionViewDidLoad() {
    console.log("ion view did load");
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;

    if (!this.showSearch) {
      this.filter = '';
    }
  }

  getNotices() {
    let data = {
      rowsPerPage: this.rowsPerPage,
      pageNum: this.pageNum
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getNotices(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.notices = JSON.parse(res.body.toString());
              console.log("notices: ", this.notices);
            } else {
              // this.notices = SocietyListing.notices;
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

  delNotice(n: any) {
    let data = {
      noticeSequ: n.noticeSequ
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.delNotice(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              let i = this.notices.findIndex(i => { return (i.noticeSequ === n.noticeSequ) });
              this.notices.splice(i, 1);
            } else {
              // this.notices = SocietyListing.notices;
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

  navAddNotice() {
    this.router.navigate(["notices/add"]);
  }

  navEditNotice(n: any) {
    this.storageService.storeObject("notice", n);
    this.router.navigate(["notices/edit"]);
  }

}
