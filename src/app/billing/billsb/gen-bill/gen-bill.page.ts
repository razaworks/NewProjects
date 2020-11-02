import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { ConnectivityService } from 'src/app/common/services/connectivityCheck.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-gen-bill',
  templateUrl: './gen-bill.page.html',
  styleUrls: ['./gen-bill.page.scss'],
})
export class GenBillPage implements OnInit {
  months: any[] = [
    { monthSequ: 1, monthVal: 0, monthText: 1 },
    { monthSequ: 2, monthVal: 1, monthText: 2 },
    { monthSequ: 3, monthVal: 2, monthText: 3 },
    { monthSequ: 4, monthVal: 3, monthText: 4 },
    { monthSequ: 5, monthVal: 4, monthText: 5 },
    { monthSequ: 6, monthVal: 5, monthText: 6 },
    { monthSequ: 7, monthVal: 6, monthText: 7 },
    { monthSequ: 8, monthVal: 7, monthText: 8 },
    { monthSequ: 9, monthVal: 8, monthText: 9 },
    { monthSequ: 10, monthVal: 9, monthText: 10 },
    { monthSequ: 11, monthVal: 10, monthText: 11 },
    { monthSequ: 12, monthVal: 11, monthText: 12 }
  ];

  years: any[] = [
    { yearSequ: 1, yearVal: 2021, yearText: 2021 },
    { yearSequ: 2, yearVal: 2020, yearText: 2020 },
    { yearSequ: 3, yearVal: 2019, yearText: 2019 },
    { yearSequ: 4, yearVal: 2018, yearText: 2018 }
  ]

  userInfo: any;
  generateBillFormGroup: FormGroup;
  month: FormControl;
  year: FormControl;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private globals: Globals,
    private fb: FormBuilder,
    private commonService: CommonService,
    private connectivityService: ConnectivityService,
    private location: Location
  ) { 
    this.userInfo = this.globals.userInfo;
    if (this.userInfo == null || this.userInfo == undefined || this.userInfo == "") {
      this.router.navigate(["login"]);
    }
  }

  ngOnInit() {
    this.initFormValidations();
  }
  
  initFormValidations() {
    this.generateBillFormGroup = this.fb.group({
      month: ['', [Validators.required]],
      year: ['', [Validators.required]]
    });
  }

  generateBill() {
    if (this.generateBillFormGroup.valid) {
      const month = parseInt(this.generateBillFormGroup.controls.month.value);
      const year = parseInt(this.generateBillFormGroup.controls.year.value);
      let data = {
        socSequ: this.userInfo.SocSequ,
        date: new Date(year, month, new Date().getDate())
      }
      console.log("data: ", data);
      var networkConnection = this.connectivityService.isOnline();
      if (networkConnection) {
        this.commonService.generateBill(data).subscribe(
          (res) => {
            if (res.status == 200) {
              if (res.body !== null || res.body !== undefined) {
                console.log("res: ", res);
                alert("Successfully Generated!");
                this.location.back();
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
    } else {
      alert("Please fill all details!");
    }
  }

  back() {
    this.location.back();
  }

}
