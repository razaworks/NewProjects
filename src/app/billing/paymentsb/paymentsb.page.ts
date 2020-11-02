import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { ConnectivityService } from 'src/app/common/services/connectivityCheck.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-paymentsb',
  templateUrl: './paymentsb.page.html',
  styleUrls: ['./paymentsb.page.scss'],
})
export class PaymentsbPage implements OnInit {
  showList: boolean = false;
  isLoaded: boolean = false;
  rowsPerPage: number = 10;
  pageNum: number = 1;
  userInfo: any;
  filter: string = "";
  rootPath: string = '';
  payments: any[] = [];

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
    this.rootPath = this.commonService.imgUrl + '/ImageStorage/billing/';
  }

  ngOnInit() {
  }
  
  ionViewDidEnter() {
    if (this.userInfo !== null && this.userInfo !== undefined) {
      if (this.userInfo.MemberTypeSequ === 2) {
        this.showList = true;
        this.getPaymentList();
      } else {
        this.showList = false;
        this.getPayments();
      }
    }
  }

  navAddPayment() {
    this.router.navigate(["billing/payments/add"]);
  }

  getPayments() {
    this.isLoaded = false;
    let data = {
      rowsPerPage: this.rowsPerPage,
      pageNum: this.pageNum,
      persSequ: this.userInfo.PersSequ,
      socSequ: this.userInfo.SocSequ
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getPayments(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.payments = JSON.parse(res.body.toString());
              console.log("payments: ", this.payments);
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

  getPaymentList() {
    this.isLoaded = false;
    let data = {
      rowsPerPage: this.rowsPerPage,
      pageNum: this.pageNum,
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getPaymentList(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.payments = JSON.parse(res.body.toString());
              console.log("payments: ", this.payments);
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

  navPaymentDetails(p: any) {
    this.storageService.storeObject("pmnt_scr", p);
    this.router.navigate(["/billing/payments/payment-details"]);
  }

  getPrevBal(a: number, b: number): number {
    const i = Math.sign(b);
    if (i === 1) {
      return a + b;
    } else if (i === -1) {
      return a - b;
    }
  }

}
