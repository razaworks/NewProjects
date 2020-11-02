import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common/services/common.service';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { StorageService } from '../common/services/storage.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  reports: any[] = [
    {
      reportL1Sequ: 1,
      reportL1Name: "Generate Bills",
      collapse: false,
      reportL2: [
        {
          reportL2Sequ: 1,
          reportL2Name: "Current Month"
        },
        {
          reportL2Sequ: 2,
          reportL2Name: "Current Quarter"
        },
        {
          reportL2Sequ: 3,
          reportL2Name: "Selected Period"
        }
      ]
    },
    {
      reportL1Sequ: 2,
      reportL1Name: "Outstanding Report",
      collapse: false,
      reportL2: [
        {
          reportL2Sequ: 4,
          reportL2Name: "Member Outstanding"
        },
        {
          reportL2Sequ: 5,
          reportL2Name: "Electric Bills"
        },
        {
          reportL2Sequ: 6,
          reportL2Name: "Water Bills"
        },
        {
          reportL2Sequ: 7,
          reportL2Name: "Assessment Bills"
        }
      ]
    },
    {
      reportL1Sequ: 3,
      reportL1Name: "Payment Reports",
      collapse: false,
      reportL2: [
        {
          reportL2Sequ: 8,
          reportL2Name: "Member Payment Record"
        },
        {
          reportL2Sequ: 9,
          reportL2Name: "Audiorium Booking Record"
        }
      ]
    }
  ];
  userInfo: any;
  filter: string = "";
  rootPath: string = '';
  rowsPerPage: number = 10;
  pageNum: number = 1;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private commonService: CommonService,
    private connectivityService: ConnectivityService,
    private globals: Globals,
  ) {
    this.userInfo = this.globals.userInfo;
    if (this.userInfo == null || this.userInfo == undefined) {
      // this.router.navigate(["login"]);
    }

    this.rootPath = this.commonService.imgUrl;

    this.reports.forEach((el) => {
      el.l1id = "rl1-" + Math.floor((Math.random() * 100) + 1).toString();
      el.reportL2.forEach((r2) => {
        r2.l2id = "rl2-" + Math.floor((Math.random() * 100) + 1).toString();
      });
    });

    console.log("reports: ", this.reports);
   }

  ngOnInit() {
  }

  collapse(r1: any) {
    r1.collapse = !r1.collapse;
  }

}
