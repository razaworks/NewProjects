import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../common/services/storage.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Globals } from '../globals';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { CommonService } from '../common/services/common.service';
import * as $ from 'jquery';
import { MessageService } from '../common/services/msg-service.service';
import { Location } from '@angular/common';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  showMyPrf: boolean = true;
  showMmbrs: boolean = false;
  userInfo: any;
  editProfFormGrp: FormGroup;
  fullName: FormControl;
  phone: FormControl;
  email: FormControl;
  waPhone: FormControl;
  city: FormControl;
  state: FormControl;
  country: FormControl;
  zipCode: FormControl;
  googleId: FormControl;
  fbId: FormControl;
  rootPath: string = "";
  m: any;
  ui: any;
  isLogged: boolean = false;
  profileImg: string = "";
  showMembers: boolean = true;
  hasMembers: boolean = false;
  addMbr: boolean = false;
  fileToUpload: File = null;
  fileName: string = '';
  base64Img: string = '';
  showMenu: boolean = false;

  constructor(
    private router: Router,
    private ac: ActivatedRoute,
    private storageService: StorageService,
    private globals: Globals,
    private fb: FormBuilder,
    private connectivityService: ConnectivityService,
    private commonService: CommonService,
    private msgService: MessageService,
    private location: Location,
    public ionicStorage: Storage,
  ) {
    this.userInfo = this.globals.userInfo;
    this.rootPath = this.commonService.imgUrl;
    console.log("root path",this.rootPath);
    console.log("profile Image",this.userInfo.ProfileImg);

    this.ui = this.globals.userInfo;
    this.isLogged = this.globals.isLogged;
    if (this.ui === null || this.ui === undefined) {
      this.router.navigate(["login"]);
    }

    // this.m = this.storageService.getObject("m");
    // if (this.m !== null && this.m !== undefined) {
    //   this.userInfo = this.m;
    // }
  }
  getProfileImg() {
    if (this.userInfo === null && this.userInfo === '' || this.userInfo === undefined) {
      return "url('hero-background-image-01.jpg')";
    } else {
      return "url('" + this.rootPath + this.userInfo.ProfileImg + "')";
    }
  }

  ionViewDidEnter() {
    
    
  }

  ngOnInit() {
    this.editProfFormGrp = this.fb.group({
      fullName: [''],
      phone: [''],
      email: [''],
      waPhone: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: [''],
      googleId: [''],
      fbId: ['']
    });

    if (this.m !== null && this.m !== undefined) {
      this.editProfFormGrp.disable();
    }
  }

  showMyPrfile() {
    this.showMmbrs = false;
    this.showMyPrf = true;
  }

  toggleView() {
    this.showMembers = !this.showMembers;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.ionicStorage.clear();
    this.storageService.clearAllObjects();
    this.globals.userInfo = null;
    this.globals.isLogged = false;
    this.storageService.storeObject("clr_login", true);
    this.router.navigate(["login"]);
  }

  back() {
    let url = this.router.url;
    if (url == '/notices') {
      this.navHome();
    } else {
      this.location.back();
    }
  }

  navHome() {
    this.router.navigate(["index"]);
  }

  members() {
    this.router.navigate(["members"]);
  }

  edit() {
    if (this.editProfFormGrp.valid) {
      let data = {
        fullName: this.editProfFormGrp.controls.fullName.value,
        phone: this.editProfFormGrp.controls.phone.value,
        email: this.editProfFormGrp.controls.email.value,
        waPhone: this.editProfFormGrp.controls.waPhone.value,
        city: this.editProfFormGrp.controls.city.value,
        state: this.editProfFormGrp.controls.state.value,
        country: this.editProfFormGrp.controls.country.value,
        zipCode: this.editProfFormGrp.controls.zipCode.value,
        googleId: this.editProfFormGrp.controls.googleId.value,
        fbId: this.editProfFormGrp.controls.fbId.value
      }
      console.log("data: ", data);
    }
  }

  lastX: any;
  scrollEv(event) {
    if (event.detail.scrollTop > Math.max(300, this.lastX)) {
      // $('#ion-head-navbar').removeClass("show");
      // $('#ion-head-navbar').addClass("hide");
      $('#ion-head-navbar').removeClass("fadein").addClass("fadeout");
      // $('.hero-wrapper').removeClass("push").addClass("pull");
    } else if (event.detail.scrollTop <= Math.max(0, 300)) {
      // $('#ion-head-navbar').removeClass("hide");
      // $('#ion-head-navbar').addClass("show");
      $('#ion-head-navbar').removeClass("fadeout").addClass("fadein");
      // $('.hero-wrapper').removeClass("pull").addClass("push");
    }

    this.lastX = event.detail.scrollTop;
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

  onFileChange(files: FileList) {
    if (files[0].size <= 2097152) {
      this.fileToUpload = files.item(0);
      this.fileName = this.makeString() + ".jpg";
      let reader: FileReader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.fileToUpload);
    } else {
      alert("File too big. Upload File less than 2 MB");
    };
  }

  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.base64Img = btoa(binaryString);  // Converting binary string data.
    this.saveProfilePhoto();
  }

  makeString(): string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 32; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
  }

  saveProfilePhoto() {
    let data = {
      PersSequ: this.userInfo.PersSequ,
      MediaSrc: this.base64Img,
      MediaFileName: this.fileName
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.saveProfilePhoto(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.userInfo.ProfileImg = "/ImageStorage/Profiles/" + this.fileName;
              this.globals.userInfo = this.userInfo;
              this.fileName = "";
              this.fileToUpload = null;
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
  }

}
