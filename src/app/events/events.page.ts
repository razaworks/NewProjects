import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common/services/common.service';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { StorageService } from '../common/services/storage.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {
  showSearch: boolean = false;
  userInfo: any;
  filter: string = "";
  rootPath: string = '';
  rowsPerPage: number = 10;
  pageNum: number = 1;
  events: any[] = [];
  p: number = 1;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private commonService: CommonService,
    private connectivityService: ConnectivityService,
    private globals: Globals,
  ) {
    this.userInfo = this.globals.userInfo;
    if (this.userInfo == null || this.userInfo == undefined) {
      this.router.navigate(["login"]);
    }

    // this.getEvents();

    this.rootPath = this.commonService.imgUrl;
  }

  ionViewDidEnter() {
    this.getEvents();
    console.log("ion view did enter");
  }

  ngOnInit() {
    let nna = this.storageService.getObject("new_event_added");
    if (nna) {
      this.getEvents();
    }
    let eventedited = this.storageService.getObject("event_edited");
    // if (eventedited !== null) {
    //   let i = this.events.findIndex(i => { return (i.eventSequ === eventedited.eventSequ) });
    //   this.events.forEach((el) => {
    //     if (el.eventSequ === i) {
    //       el.eventTitle = eventedited.eventTitle;
    //       el.eventDesc = eventedited.eventDesc;
    //       // el.eventImg = eventedited.eventImg;
    //     }
    //   });
    // }
    // this.getEvents();
    console.log("on init");
  }

  ionViewDidLoad() {
    console.log("ion view did load");
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;

    if (!this.showSearch) {
      this.filter = '';
    }
  }

  getEvents() {
    let data = {
      rowsPerPage: this.rowsPerPage,
      pageNum: this.pageNum
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.getEvents(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              this.events = JSON.parse(res.body.toString());
              console.log("events: ", this.events);
            } else {
              // this.events = SocietyListing.events;
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

  delEvent(n: any) {
    let data = {
      eventSequ: n.eventSequ
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.delEvent(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              // this.events = JSON.parse(JSON.parse(res["_body"].toString()));
              // console.log("events: ", this.events);
              console.log("deleted successfully");
              let i = this.events.findIndex(i => { return (i.eventSequ === n.eventSequ) });
              this.events.splice(i, 1);
            } else {
              // this.events = SocietyListing.events;
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

  navAddEvent() {
    this.router.navigate(["events/add"]);
  }

  navEditEvent(n: any) {
    this.storageService.storeObject("event", n);
    this.router.navigate(["events/edit"]);
  }
}
