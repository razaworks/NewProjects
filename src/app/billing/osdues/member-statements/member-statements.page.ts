import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { ConnectivityService } from 'src/app/common/services/connectivityCheck.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-member-statements',
  templateUrl: './member-statements.page.html',
  styleUrls: ['./member-statements.page.scss'],
})
export class MemberStatementsPage implements OnInit, OnDestroy {
  rowsPerPage: number = 10;
  pageNum: number = 1;
  userInfo: any;
  filter: string = "";
  rootPath: string = '';
  statements: any[] = [];
  pymnt: any;
  isLoaded: boolean = false;

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
    this.rootPath = this.commonService.imgUrl;
    this.pymnt = this.storageService.getObject("str_mbt_stmnt");
    if (this.pymnt == null || this.pymnt == undefined) {
      this.location.back();
    } else {
      this.getStatements();
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.storageService.removeObject("str_mbt_stmnt");
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
      persSequ: this.pymnt.PersSequ
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
              this.isLoaded = true;
              console.log("statements: ", this.statements);
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

}
