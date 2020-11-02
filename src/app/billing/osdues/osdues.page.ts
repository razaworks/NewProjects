import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { ConnectivityService } from 'src/app/common/services/connectivityCheck.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-osdues',
  templateUrl: './osdues.page.html',
  styleUrls: ['./osdues.page.scss'],
})
export class OsduesPage implements OnInit {
  members: any[] = [];
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
    private globals: Globals
  ) {
    this.userInfo = this.globals.userInfo;
    if (this.userInfo == null || this.userInfo == undefined) {
      this.router.navigate(["login"]);
    }
    this.rootPath = this.commonService.imgUrl;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.getFlatList();
  }

  navMemberStatements(m: any) {
    this.storageService.storeObject("str_mbt_stmnt", m);
    this.router.navigate(["billing/outstanding-dues/member-statements"]);
  }

  getFlatList() {
    if (this.members.length == 0) {
      this.isLoaded = false;
    }
    let data = {
      rowsPerPage: this.rowsPerPage,
      pageNum: this.pageNum,
      socSequ: this.userInfo.SocSequ
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getFlatList(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              let members: any[] = [], join: any[] = [];
              members = JSON.parse(res.body.toString());
              if (members.length > 0) {
                join = this.members; this.members = join.concat(members);
                console.log("members: ", this.members);
                if (this.members.length >= 10) {
                  this.reqBtnText = "Load More";
                }
              } else {
                this.reqBtnText = "";
              }
              this.isLoaded = true;
            // } else {
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

  loadMore() {
    this.pageNum = this.pageNum + 1;
    this.getFlatList();
    // this.reqBtnText = "Request More";
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;

    if (!this.showSearch) {
      this.filter = '';
    }
  }

}
