import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/common/services/common.service';
import { ConnectivityService } from 'src/app/common/services/connectivityCheck.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { Globals } from 'src/app/globals';
import { ViewdocPage } from '../../viewdoc/viewdoc.page';

@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.page.html',
  styleUrls: ['./payment-detail.page.scss'],
})
export class PaymentDetailPage implements OnInit {
  rowsPerPage: number = 10;
  pageNum: number = 1;
  userInfo: any;
  filter: string = "";
  rootPath: string = '';
  statements: any[] = [];
  pymnt: any;
  getRemark: boolean = false;
  isLoaded: boolean = false;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private commonService: CommonService,
    private connectivityService: ConnectivityService,
    private globals: Globals,
    private location: Location,
    private modalController: ModalController
  ) {
    this.userInfo = this.globals.userInfo;
    if (this.userInfo == null || this.userInfo == undefined) {
      this.router.navigate(["login"]);
    }
    this.rootPath = this.commonService.imgUrl;
    this.pymnt = this.storageService.getObject("pmnt_scr");
    // if (this.pymnt == null || this.pymnt == undefined) {
    //   this.location.back();
    // } else {
    //   this.getStatements();
    // }
  }

  ionViewDidEnter() {
    if (this.pymnt == null || this.pymnt == undefined) {
      this.location.back();
    } else {
      this.getStatements();
    }
  }

  ngOnInit() {
  }

  getPrevBal(a: number, b: number): number {
    const i = Math.sign(b);
    if (i === 1) {
      return a + b;
    } else if (i === -1) {
      return a - b;
    }
  }

  getStatements() {
    let data = {
      rowsPerPage: this.rowsPerPage,
      pageNum: this.pageNum,
      persSequ: this.pymnt.persSequ,
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getStatements(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.statements = JSON.parse(res.body.toString());
              if (this.statements.length == 10) {
              }
              console.log("statements: ", this.statements);
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

  toggleRemark() {
    this.getRemark = !this.getRemark;
  }

  verify(st: number, s: any) {
    (st == 1) ? alert("verified") : alert("rejected");
    this.toggleRemark();
  }

  updateTransStatus(s: any) {
    let data = {
      transSequ: s.transSequ,
      persSequ: s.persSequ,
      updatedBy: this.userInfo.PersSequ,
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.updateTransStatus(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.statements.forEach((el) => {
                if (el.transSequ === s.transSequ) {
                  el.status = 1;
                }
              });
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

  viewDocument(img: string) {
    this.modalController.create({
      component: ViewdocPage,
      componentProps: {
        img: img
      }
    }).then(modal => modal.present());
  }

}
