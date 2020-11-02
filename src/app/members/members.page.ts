import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../common/services/storage.service';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { CommonService } from '../common/services/common.service';
import * as $ from 'jquery';
import { Location } from '@angular/common';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  addMbr: boolean = false;
  userInfo: any;
  addMmbrFormGrp: FormGroup;
  name: FormControl;
  relation: FormControl;
  username: FormControl;
  emailID: FormControl;
  phone: FormControl;
  members: any;
  memberInfo: any = {
    fullName: String,
    relation: String,
    username: String,
    memberOf: Number,
    email: String,
    phone: String,
    persSequ: Number,
    socSequ: Number,
    passcode: String,
    addressLine1: String,
    addressLine2: String,
    addressLine3: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  }
  rootPath: string = "";

  hasMembers: boolean = false;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private fb: FormBuilder,
    private connectivityService: ConnectivityService,
    private commonService: CommonService,
    private location: Location,
  ) {
    this.userInfo = this.storageService.getObject("userInfo");
    this.rootPath = this.commonService.imgUrl;
    if (this.userInfo === null || this.userInfo === undefined) {
      this.router.navigate(["login"]);
    }
    console.log("userInfo: ", this.userInfo);

    this.getMembers();
  }

  back() {
    let url = this.router.url;
    if (url == '/notices') {
      this.navHome();
    } else {
      this.location.back();
    }
  }

  ngOnInit() {
    this.addMmbrFormGrp = this.fb.group({
      name: ['', [Validators.required]],
      relation: ['', [Validators.required]],
      username: ['', [Validators.required]],
      emailID: [''],
      phone: [''],
    });
  }

  addMember() {
    this.addMbr = true;
  }

  getMembers() {
    let data = {
      persSequ: this.userInfo.PersSequ
    }
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getMember(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res["_body"] !== null || res["_body"] !== undefined || res["_body"] !== "\"\"") {
              const resObj = JSON.parse(res.body.toString());
              console.log(resObj);
              this.members = resObj;
              this.hasMembers = true;
            } else {
              this.hasMembers = false;
            }
          }
        }
      );
    }
  }

  cancel() {
    this.addMbr = false;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  add() {
    if (this.addMmbrFormGrp.valid) {
      this.memberInfo.fullName = this.addMmbrFormGrp.controls.name.value;
      this.memberInfo.relation = this.addMmbrFormGrp.controls.relation.value;
      this.memberInfo.username = this.addMmbrFormGrp.controls.username.value;
      this.memberInfo.memberOf = this.userInfo.PersSequ;
      this.memberInfo.email = this.addMmbrFormGrp.controls.emailID.value;
      this.memberInfo.phone = this.addMmbrFormGrp.controls.phone.value;
      this.memberInfo.persSequ = this.userInfo.PersSequ;
      this.memberInfo.socSequ = this.userInfo.SocSequ;
      this.memberInfo.passcode = this.userInfo.Phone;
      this.memberInfo.addressLine1 = this.userInfo.AddressLine1;
      this.memberInfo.addressLine2 = this.userInfo.AddressLine2;
      this.memberInfo.addressLine3 = this.userInfo.AddressLine3;
      this.memberInfo.city = this.userInfo.City;
      this.memberInfo.state = this.userInfo.State;
      this.memberInfo.country = this.userInfo.Country;
      this.memberInfo.zipCode = this.userInfo.ZipCode;
      let inputData = Object.assign({}, this.memberInfo);
      inputData.Passcode = btoa(this.memberInfo.passcode);
      var networkConnection = this.connectivityService.isOnline();
      if (networkConnection) {
        this.commonService.addMember(inputData).subscribe(
          (res) => {
            if (res.status == 200) {
              if (res.body !== null || res.body !== undefined) {
                let resObj = JSON.parse(res.body.toString());
                console.log(resObj);
                this.members = resObj;
              } else {
                alert("Invalid Details!");
              }
            }
          }, (err) => {
            console.log(err);
          }
        );
      }
    } else {
      alert("Fill All Specified Details!");
    }
  }

  navHome() {
    this.router.navigate(["index"]);
  }

  myProfile() {
    this.router.navigate(["profile"]);
  }

  lastX: any;
  scrollEv(event) {
    if (event.detail.scrollTop > Math.max(600, this.lastX)) {
      // $('#ion-head-navbar').removeClass("show");
      // $('#ion-head-navbar').addClass("hide");
      $('#ion-head-navbar').removeClass("fadein").addClass("fadeout");
      // $('.hero-wrapper').removeClass("push").addClass("pull");
    } else if (event.detail.scrollTop <= Math.max(0, 600)) {
      // $('#ion-head-navbar').removeClass("hide");
      // $('#ion-head-navbar').addClass("show");
      $('#ion-head-navbar').removeClass("fadeout").addClass("fadein");
      // $('.hero-wrapper').removeClass("pull").addClass("push");
    }

    this.lastX = event.detail.scrollTop;
  }

}
