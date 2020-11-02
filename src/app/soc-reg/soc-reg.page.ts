import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../common/services/storage.service';
import { CommonService } from '../common/services/common.service';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { SocietyRegistration } from './soc-reg.model.page';

@Component({
  selector: 'app-soc-reg',
  templateUrl: './soc-reg.page.html',
  styleUrls: ['./soc-reg.page.scss'],
})
export class SocRegPage implements OnInit {
  socRegFormGrp: FormGroup;
  socName: FormControl;
  noOfMembers: FormControl;
  memberTypeSequ: any;
  fullName: FormControl;
  email: FormControl;
  phone: FormControl;
  otp: FormControl;
  addressLine1: FormControl;
  addressLine2: FormControl;
  addressLine3: FormControl;
  state: FormControl;
  city: FormControl;
  zipCode: FormControl;
  nameAsSalesDeed: FormControl;
  blockNo: any;
  wing: any;
  floor: any;
  flatNo: FormControl;
  flatArea: FormControl;

  userInfo: any;
  message: string = "";
  isOTPGenerated: boolean = false;
  isSubmitted: boolean = false;
  toProceed: boolean = false;

  societydata: any = {
    socName: "",
    noOfMembers: "",
    memberTypeSequ: "",
    fullName: "",
    email: "",
    phone: "",
    otp: "",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    state: "",
    city: "",
    zipCode: "",
    nameAsSalesDeed: "",
    flatNo: "",
    flatArea: "",
    isRegenOTP: false,
  }

  mTypes: any;
  blockNos: any;
  wings: any;
  floors: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService,
    private connectivityService: ConnectivityService,
    private storageService: StorageService,
  ) {
    this.blockNos = SocietyRegistration.blockNo;
    this.wings = SocietyRegistration.wing;
    this.floors = SocietyRegistration.floor;
  }

  ngOnInit() {
    this.getMemberTypes();
    this.socRegFormGrp = this.fb.group({
      socName: ['', [Validators.required]],
      noOfMembers: ['', [Validators.required]],
      // memberType: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required]],
      otp: [null],
      addressLine1: [null],
      addressLine2: [null],
      addressLine3: [null],
      state: [null],
      city: [null],
      zipCode: [null],
      nameAsSalesDeed: [null],
      flatNo: [null],
      flatArea: [null]
    });
  }

  get SocName() {
    return this.socRegFormGrp.get("socName");
  }
  get NoOfMembers() {
    return this.socRegFormGrp.get("noOfMembers");
  }
  get FullName() {
    return this.socRegFormGrp.get("fullName");
  }
  get Email() {
    return this.socRegFormGrp.get("email");
  }
  get Phone() {
    return this.socRegFormGrp.get("phone");
  }
  get Otp() {
    return this.socRegFormGrp.get("otp");
  }
  get addLine1() {
    return this.socRegFormGrp.get("addressLine1");
  }
  get addLine2() {
    return this.socRegFormGrp.get("addressLine2");
  }
  get addLine3() {
    return this.socRegFormGrp.get("addressLine3");
  }
  get State() {
    return this.socRegFormGrp.get("state");
  }
  get City() {
    return this.socRegFormGrp.get("city");
  }
  get ZipCode() {
    return this.socRegFormGrp.get("zipCode");
  }
  get NameAsSalesDeed() {
    return this.socRegFormGrp.get("nameAsSalesDeed");
  }
  get FlatNo() {
    return this.socRegFormGrp.get("flatNo");
  }
  get FlatArea() {
    return this.socRegFormGrp.get("flatArea");
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  mt(e) {
    // console.log(e);
    this.memberTypeSequ = parseInt(e.target.value);
  }

  bn(e) {
    // console.log(e);
    this.blockNo = e.target.value;
  }

  wg(e) {
    // console.log(e);
    this.wing = e.target.value + " Wing";
  }

  fr(e) {
    // console.log(e);
    this.floor = e.target.value;
  }

  generateOTP() {
    console.log(this.mTypes);
    if (this.socRegFormGrp.valid) {
      this.societydata.socName = this.socRegFormGrp.controls.socName.value;
      this.societydata.noOfMembers = this.socRegFormGrp.controls.noOfMembers.value;
      this.societydata.memberTypeSequ = this.memberTypeSequ;
      this.societydata.fullName = this.socRegFormGrp.controls.fullName.value;
      this.societydata.email = this.socRegFormGrp.controls.email.value;
      this.societydata.phone = this.socRegFormGrp.controls.phone.value;
      this.getOTP();
    }
  }

  getOTP() {
    console.log("societydata: ", this.societydata);
    this.isOTPGenerated = true;
    var networkConnection = this.connectivityService.isOnline();
    this.commonService.getOTP(this.societydata).subscribe(
      (res) => {
        const resObj = JSON.parse(res.body.toString());
        if (resObj.message === "700|OTP already exists") {
          this.message = "verification code already generated, kindly click on resend code."
          this.isOTPGenerated = true;
        } else {
          alert(resObj.message);
          this.societydata.otp = resObj.message;
          const otpControl = this.socRegFormGrp.get('otp');
          const addressLine1 = this.socRegFormGrp.get('addressLine1');
          const addressLine2 = this.socRegFormGrp.get('addressLine2');
          const addressLine3 = this.socRegFormGrp.get('addressLine3');
          const state = this.socRegFormGrp.get('state');
          const city = this.socRegFormGrp.get('city');
          const zipCode = this.socRegFormGrp.get('zipCode');
          otpControl.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
          addressLine1.setValidators([Validators.required]);
          addressLine2.setValidators([Validators.required]);
          addressLine3.setValidators([Validators.required]);
          state.setValidators([Validators.required]);
          city.setValidators([Validators.required]);
          zipCode.setValidators([Validators.required]);
          this.message = "OTP is sent to your mobile ( " + this.societydata.phone + " ), if not received in 1 minute, kindly click on resend code."
          this.isOTPGenerated = true;
        }
      }, (err => {
        if (err.status === 0) {
          console.log(err);
        } else {
          console.log(err);
        }
      })
    );
  }

  next() {
    this.isSubmitted = true;
  }

  proceed() {
    if (this.socRegFormGrp.valid) {
      this.societydata.addressLine1 = this.socRegFormGrp.controls.addressLine1.value;
      this.societydata.addressLine2 = this.socRegFormGrp.controls.addressLine2.value;
      this.societydata.addressLine3 = this.socRegFormGrp.controls.addressLine3.value;
      this.societydata.state = this.socRegFormGrp.controls.state.value;
      this.societydata.city = this.socRegFormGrp.controls.city.value;
      this.societydata.zipCode = this.socRegFormGrp.controls.zipCode.value;
      console.log("societydata: ", this.societydata);
      const nameAsSalesDeed = this.socRegFormGrp.get("nameAsSalesDeed");
      const flatNo = this.socRegFormGrp.get("flatNo");
      const flatArea = this.socRegFormGrp.get("flatArea");
      nameAsSalesDeed.setValidators([Validators.required]);
      flatNo.setValidators([Validators.required]);
      flatArea.setValidators([Validators.required]);
      this.toProceed = true;
    }
  }

  register() {
    if (this.socRegFormGrp.valid) {
      this.societydata.nameAsSalesDeed = this.socRegFormGrp.controls.nameAsSalesDeed.value;
      this.societydata.blockNo = this.blockNo;
      this.societydata.wing = this.wing;
      this.societydata.floor = this.floor;
      this.societydata.flatNo = this.socRegFormGrp.controls.flatNo.value;
      this.societydata.flatArea = this.socRegFormGrp.controls.flatArea.value.toString() + " sqft";
      console.log("societydata: ", this.societydata);
    }
    let inputData = Object.assign({}, this.societydata);
    inputData.Passcode = btoa(this.societydata.otp);
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.registerSociety(inputData).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              alert("Registered Successfully");
              this.router.navigate(["login"]);
            } else {
              alert("Invalid Details!");
            }
          }
        }
      );
    }
  }

  resendOTP() {
    this.societydata.isRegenOTP = true;
    this.getOTP();
  }

  getMemberTypes() {
    let data = {};
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getMemberTypes(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.mTypes = JSON.parse(res.body.toString());
              console.log("mTypes: ", this.mTypes);
            } else {
              this.mTypes = SocietyRegistration.mTypes;
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
