import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { ConnectivityService } from 'src/app/common/services/connectivityCheck.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-billsb',
  templateUrl: './billsb.page.html',
  styleUrls: ['./billsb.page.scss'],
})
export class BillsbPage implements OnInit {
  showbillsGenerated: boolean = false;
  isLoaded: boolean = false;
  rowsPerPage: number = 10;
  pageNum: number = 1;
  userInfo: any;
  filter: string = "";
  rootPath: string = '';
  billsGenerated: any[] = [];
  reqBtnText: string = "";

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
    this.rootPath = this.commonService.imgUrl;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.userInfo = this.globals.userInfo;
    if (this.userInfo !== null && this.userInfo !== undefined) {
      this.getGeneratedBills();
    }
  }

  toggleStatements() {
    this.showbillsGenerated = !this.showbillsGenerated;
  }

  loadMore() {
    if (this.pageNum == 1) {
      this.pageNum = 2;
      this.getGeneratedBills();
      this.reqBtnText = "Request More";
    }

    if (this.pageNum == 2) {
      console.log("Request More billsGenerated");
    }
  }

  getGeneratedBills() {
    this.isLoaded = false;
    let data = {
      rowsPerPage: this.rowsPerPage,
      pageNum: this.pageNum,
      persSequ: this.userInfo.PersSequ,
      socSequ: this.userInfo.SocSequ
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getGeneratedBills(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.billsGenerated = JSON.parse(res.body.toString());
              if (this.billsGenerated.length == 10) {
                this.reqBtnText = "Load More";
              }
              console.log("billsGenerated: ", this.billsGenerated);
              this.isLoaded = true;
            } else {
              console.log("null");
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

  navGenerateBill() {
    this.router.navigate(["billing/bills/generate"]);
  }

}
