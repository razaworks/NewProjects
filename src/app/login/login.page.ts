import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../common/services/storage.service';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { CommonService } from '../common/services/common.service';
import { Storage } from '@ionic/storage';
import { Globals } from '../globals';
import { MessageService } from '../common/services/msg-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGrp: FormGroup;
  phone: FormControl;
  username: FormControl;
  otp: FormControl;
  email: FormControl;
  pass: FormControl;
  cpass: FormControl;

  userInfo: any;
  isOTPGenerated: boolean = false;
  isSubmitted: boolean = false;
  isError: boolean = false;
  message: string = "";
  mobileNo: string = "";
  logindata: any = {
    mobileNo: "",
    otpCode: "",
    email: "",
    isRegenOTP: false,
  }

  // showPhn: boolean = true;
  showEml: boolean = false;
  showFbk: boolean = false;
  showGle: boolean = false;
  mbrLogin: boolean = false;
  isFstLog: boolean = false;
  isChecked: boolean = false;
  setPass: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    // private httpService: httpService,
    private storageService: StorageService,
    private connectivityService: ConnectivityService,
    private commonService: CommonService,
    public ionicStorage: Storage,
    private globals: Globals,
    private msgService: MessageService
  ) {
    if (this.globals.userInfo === null) {
      this.phoneLogin();
    }
    Promise.all([]).then(() => this.storageGet());
  }

  ngOnInit() {
    this.initOwnerLoginFormVal();

    if (this.storageService.getObject("clr_login")) {
      this.loginFormGrp.reset();
      this.message = '';
    }
  }

  ionViewDidEnter() {
    if (this.storageService.getObject("clr_login")) {
      this.loginFormGrp.reset();
      this.message = '';
    }
  }
  initOwnerLoginFormVal() {
    this.loginFormGrp = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      username: [null],
      otp: [null],
      email: [null],
      pass: [null],
      cpass: [null]
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  generateOTP() {
    if (this.loginFormGrp.valid) {
      this.logindata.mobileNo = this.loginFormGrp.controls.phone.value;
      this.getOTP();
    }
  }

  getOTP() {
    let inputData = Object.assign({}, this.logindata);
    if (this.mbrLogin && this.isFstLog) {
      inputData.userName = this.loginFormGrp.controls.username.value;
    }
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getOTP(inputData).subscribe((res) => {
        if(res != null){
          console.log("getOTP",res.body);  
          const resObj = JSON.parse(res.body.toString());  
          if (resObj.message === "700|OTP already exists") {
            this.message = "Verification code already exists, kindly click on resend code."
            this.isOTPGenerated = true;
          } else {
            // alert(resObj.message);
            const otpControl = this.loginFormGrp.get('otp');
            otpControl.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
            otpControl.setValue(resObj.message);
            this.message = "OTP is sent to your mobile ( " + this.logindata.mobileNo + " ), if not received in 1 minute, kindly click on resend code."
            this.isOTPGenerated = true;
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
      alert("Check Your Network Connection!");
    }
  }

  verify() {
    let inputData = Object.assign({}, this.logindata);
    if (this.mbrLogin && this.isFstLog) {
      // Member Login w/ isFirstLogin = 1
      this.logindata.otp = this.loginFormGrp.controls.otp.value;
      inputData.Passcode = btoa(this.logindata.otp);
      inputData.userName = this.loginFormGrp.controls.username.value;
    } else if (this.mbrLogin && !this.isFstLog) {
      // Member Login w/ isFirstLogin = 0
      let pass = this.loginFormGrp.controls.pass.value;
      inputData.Passcode = btoa(pass);
      inputData.userName = this.loginFormGrp.controls.username.value;
    } else {
      // Normal Login 
      this.logindata.otp = this.loginFormGrp.controls.otp.value;
      inputData.Passcode = btoa(this.logindata.otp);
    }
    this.fetchToken(inputData);
  }

  verifyOTP() {
    let inputData = Object.assign({}, this.logindata);
    if (this.mbrLogin && this.isFstLog) {
      // Member Login w/ isFirstLogin = 1
      this.logindata.otp = this.loginFormGrp.controls.otp.value;
      inputData.Passcode = btoa(this.logindata.otp);
      inputData.userName = this.loginFormGrp.controls.username.value;
    } else if (this.mbrLogin && !this.isFstLog) {
      // Member Login w/ isFirstLogin = 0
      let pass = this.loginFormGrp.controls.pass.value;
      inputData.Passcode = btoa(pass);
      inputData.userName = this.loginFormGrp.controls.username.value;
    } else {
      // Normal Login 
      this.logindata.otp = this.loginFormGrp.controls.otp.value;
      inputData.Passcode = btoa(this.logindata.otp);
    }
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.verifyUser(inputData).subscribe(
        (data) => {
          if (data !== null || data !== undefined) {
            if (data["_body"] !== "\"\"") {
              const userInfo = JSON.parse(data["data"].json());
              this.storageService.storeObject("userInfo", userInfo);
              if (this.mbrLogin && this.isFstLog && !this.setPass) {
                const pass = this.loginFormGrp.get("pass");
                const cpass = this.loginFormGrp.get("cpass");
                pass.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(20)]);
                cpass.setValidators([Validators.required]);
                this.setPass = true;
                this.message = '';
              } else {
                this.ionicStorage.set("userInfo", userInfo);
                this.globals.userInfo = userInfo;
                this.globals.isLogged = true;
                this.msgService.bindMenu(userInfo);
                //console.log("userInfo: ", userInfo);
                if (userInfo.isFirstLogin) {
                  this.storageService.storeObject("isFirstLogin", userInfo.isFirstLogin);
                } else {
                  this.router.navigate(["index"]);
                }
                this.loginFormGrp.get('otp').clearValidators();
                this.isOTPGenerated = false;
                this.msgService.HdrClick(this.globals.isLogged);
                this.router.navigate(["index"]);
              }
            } else {
              alert("Invalid Login Details");
            }
          }
        }
      );
    } else {
      alert("Please Check Your Network!");
    }
  }

  setPassword() {
    const pass = this.loginFormGrp.get("pass").value;
    const cpass = this.loginFormGrp.get("cpass").value;
    let inputData, userInfo;
    userInfo = this.storageService.getObject("userInfo");
    inputData = Object.assign({}, this.logindata);
    inputData.Passcode = btoa(pass);
    inputData.username = userInfo.UserName;
    var networkConnection = this.connectivityService.isOnline();
    if (pass === cpass) {
      if (networkConnection) {
        this.commonService.setPass(inputData).subscribe(
          (data) => {
            if (data !== null || data !== undefined) {
              this.setPass = false;
              alert("Password Set Successfully!");
              this.router.navigate(["index"]);
            }
          }
        );
      }
    }
  }

  phoneLogin() {
    if(this.globals.isLogged){
      const email = this.loginFormGrp.get("email");
      email.reset([null]);
      this.showFbk = this.showGle = this.showEml = false;
      //this.showPhn = true;
    }
  }

  mailLogin() {
    const email = this.loginFormGrp.get("email");
    email.setValidators([Validators.required]);
    this.showFbk = this.showGle = false;
    this.showEml = true;
  }

  resendOTP() {
    this.logindata.isRegenOTP = true;
    this.getOTP();
  }

  storageGet() {
    let userInfo: any = {};
    var val = this.ionicStorage.get("userInfo");
    Promise.all([val]).then((arrayOfResults) => {
      userInfo = arrayOfResults[0];
      if (userInfo === null || userInfo === undefined) {
        this.phoneLogin();
      }
      else {
        this.storageService.storeObject("userInfo", userInfo);
        this.globals.isLogged = true;
        this.globals.userInfo = userInfo;
        if (userInfo.isFirstLogin === true) {
        }
        else {
          this.router.navigate(["index"]);
        }
      }
    });
  }

  memberLogin() {
    const phone = this.loginFormGrp.get("phone");
    const username = this.loginFormGrp.get("username");
    if (username.disabled) {
      username.enable();
    }
    phone.disable();
    username.setValidators([Validators.required]);
    this.mbrLogin = true;
  }

  ownerLogin() {
    const phone = this.loginFormGrp.get("phone");
    const username = this.loginFormGrp.get("username");
    if (phone.disabled) {
      phone.enable();
    }
    phone.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)]);
    username.disable();
    this.mbrLogin = false;
  }

  checkUser() {
    let inputData = Object.assign({}, this.logindata);
    inputData.userName = this.loginFormGrp.controls.username.value;
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.checkUser(inputData).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res["_body"] !== null || res["_body"] !== undefined || res["_body"] !== "\"\"") {
              let resObj = JSON.parse(res.body.toString());
              console.log("resObj: ", resObj);
              if (resObj.isFirstLogin === true) {
                this.getOTP();
                this.isFstLog = true;
              } else {
                const pass = this.loginFormGrp.get("pass");
                pass.setValidators([Validators.required]);
                this.isFstLog = false;
                this.isChecked = true;
              }
            } else {
              alert("Invalid Login Details!");
            }
          }
        }, (err => {
          console.log(err);
        })
      );
    } else {
      alert("Check your Network!");
    }
  }

  fetchToken(iData: any) {
    var data = "username=" + iData.mobileNo +
      "&password=" + iData.Passcode +
      "&grant_type=password";
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.fetchToken(data).subscribe(
        (res) => {
          //if (res.status == 200) {
            //if (res["_body"] !== null || res["_body"] !== undefined) {
              //let resObj = JSON.parse(res["_body"].toString());
              //let resObj = res;
              //console.log("resObj: ", resObj);
              //let tokenInfo = Object.keys(resObj);
              //let userInfo = JSON.parse(resObj.userInfo);

              let userInfo = JSON.parse(res["userInfo"]);
              //
              //tokenInfo.pop();
              //resObj = tokenInfo;
              //localStorage.setItem("ti", JSON.stringify(resObj));
              localStorage.setItem("access_token", res["access_token"]);
              this.storageService.storeObject("userInfo", userInfo);

              if (this.mbrLogin && this.isFstLog && !this.setPass) {
                const pass = this.loginFormGrp.get("pass");
                const cpass = this.loginFormGrp.get("cpass");
                pass.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(20)]);
                cpass.setValidators([Validators.required]);
                this.setPass = true;
                this.message = '';
              } 
              else {
                //This is to hold login details for app, no need to do repeat login
                this.ionicStorage.set("userInfo", userInfo);
                this.globals.userInfo = userInfo;
                this.globals.isLogged = true;
                this.message = '';
                this.msgService.bindMenu(userInfo.AccessGrant.Menus);
                if (userInfo.isFirstLogin) {
                  this.storageService.storeObject("isFirstLogin", userInfo.isFirstLogin);
                } else {
                  this.router.navigate(["index"]);
                }
                this.loginFormGrp.get('otp').clearValidators();
                this.isOTPGenerated = false;
                this.msgService.HdrClick(this.globals.isLogged);
                this.router.navigate(["index"]);
              }
            //}
          //}
        }, (err) => {
          console.error("err: ", err);
        }
      );
    } else {
    }
  }

}
