import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/common/services/storage.service';
import { Storage } from '@ionic/storage';
import { Globals } from 'src/app/globals';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { MessageService } from 'src/app/common/services/msg-service.service';
import { CommonService } from 'src/app/common/services/common.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  hideSearch: boolean = false;
  title: string;
  userInfo: any;
  isLogged: boolean = false;
  showMenu: boolean = false;

  constructor(
    public router: Router,
    private storageService: StorageService,
    public ionicStorage: Storage,
    private globals: Globals,
    private location: Location,
    private msgService: MessageService,
    private commonService: CommonService
  ) {
    let url = this.router.url;
    console.log(url);

    // this.hideOnScroll();

    this.msgService.listenHdr().subscribe(
      (d) => {
        this.isLogged = d;
        d ? this.userInfo = this.globals.userInfo : this.router.navigate(["login"]);
      }
    );
  }

  back() {
    let url = this.router.url;
    if (url == '/notices') {
      this.navHome();
    } else {
      this.location.back();
    }
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

  ngOnInit() {
    let url = this.router.url;
    if (url === "/sign-in") {
      this.hideSearch = true;
      this.title = "Sign In | Sage"
    } else if (url === "/login") {
      this.hideSearch = true;
      this.title = "Register | Sage"
    } else {
      this.hideSearch = false;
      this.title = "SAGE"
    }

    // this.userInfo = this.storageService.getObject("userInfo");
    this.userInfo = this.globals.userInfo;
    if (url === "/society-registration") {

    } else {
      // if (this.userInfo === null || this.userInfo === undefined) {
      //   this.router.navigate(["login"]);
      // }
    }

    this.isLogged = this.globals.isLogged;
    console.log("userInfo: ", this.userInfo);
  }

  setProfileImg() {
    let profileImg = this.commonService.imgUrl + this.userInfo.ProfileImg;
    $("#ion-head-navbar").css("background", "src/assets/img/hero-background-image-01.jpg");
    // $("#ion-head-navbar").removeClass("hbg");
    // $("#ion-head-navbar").css("background", "url('" + profileImg + "') no-repeat !important");
    // $("#ion-head-navbar").css("z-index", "unset");
    // $("#ion-head-navbar").css("background-size", "cover");
    // $("#ion-head-navbar").css("background-position-y", "50%");
  }

  hideOnScroll() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      var currentScrollpos = window.pageYOffset;
      if (prevScrollpos > currentScrollpos) {
        document.getElementById('ion-head-navbar').style.top = "0";
      } else {
        document.getElementById('ion-head-navbar').style.top = "-50";
      }
      prevScrollpos = currentScrollpos;
    }
  }

  navHome() {
    this.router.navigate(["index"]);
  }

  navLogin() {
    this.router.navigate(["login"]);
  }

  navSocRegister() {
    this.router.navigate(["society-registration"]);
  }

  navProfile() {
    this.router.navigate(["profile"]);
  }

}
