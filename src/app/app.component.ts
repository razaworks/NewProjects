import { Component, OnInit, Renderer2, Input } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { StorageService } from './common/services/storage.service';
import { Globals } from './globals';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { MessageService } from 'src/app/common/services/msg-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Society Listing',
      url: '/society-listing',
      icon: 'mail'
    },
    {
      title: 'Society Registration',
      url: '/society-registration',
      icon: 'mail'
    },
    {
      title: 'Outbox',
      url: '/folder/Outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ionicStorage: Storage,
    private storageService: StorageService,
    private globals: Globals,
    private router: Router,
    private renderer: Renderer2,
    private menu: MenuController,
    private msgService: MessageService,
  ) {
    this.initializeApp();

    this.msgService.listenbindMenu().subscribe(
      (userMenu) => {
        console.log("listenbindMenu",userMenu);
        this.appPages = []
        userMenu.forEach(e => {
          var a = {
            title: e.MenuName,
            url: "/" + e.NavigateTo,
            icon: e.icon
          }
          this.appPages.push(a);
        });
        

        
        //this.isLogged = d;
        //d ? this.userInfo = this.globals.userInfo : this.router.navigate(["login"]);
      }
    );
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menu.swipeGesture(false, "mainmenu");
    });
  }

  ngOnInit() {
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
    this.hideOnScroll();

    if (this.router.url === '/login' || this.router.url === "/register") {
      if ($("ion-header").hasClass("show")) {
        $("ion-header").removeClass("show");
        $("ion-header").addClass("hide");
      } else {
        $("ion-header").addClass("hide");
      }
    }
  }

  logout() {
    this.ionicStorage.clear();
    this.storageService.clearAllObjects();
    this.globals.userInfo = null;
    this.globals.isLogged = false;
    this.menu.close("mainmenu");
    this.storageService.storeObject("clr_login", true);
    this.router.navigate(["login"]);
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


}
