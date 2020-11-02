import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common/services/common.service';
import { ConnectivityService } from 'src/app/common/services/connectivityCheck.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.page.html',
  styleUrls: ['./addevent.page.scss'],
})
export class AddeventPage implements OnInit {
  addEventFormGroup: FormGroup;
  eTitle: FormControl;
  eDesc: FormControl;
  eImg: FormControl;
  userInfo: any;
  fileToUpload: File = null;
  fileName: string;
  base64Img: string;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private commonService: CommonService,
    private connectivityService: ConnectivityService,
    private globals: Globals,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private location: Location
  ) {
    this.userInfo = this.globals.userInfo;
    if (this.userInfo == null || this.userInfo == undefined) {
      this.router.navigate(["login"]);
    }
  }

  ngOnInit() {
    this.initFormValidations();
  }

  initFormValidations() {
    this.addEventFormGroup = this.fb.group({
      eTitle: ['', [Validators.required, Validators.maxLength(20)]],
      eDesc: ['', [Validators.required, Validators.maxLength(250)]],
      eImg: ['']
    });
  }

  addEvent() {
    if (this.addEventFormGroup.valid) {
      let data = {
        eventTitle: this.addEventFormGroup.controls.eTitle.value,
        eventDesc: this.addEventFormGroup.controls.eDesc.value,
        eventImg: "/ImageStorage/events/" + this.fileName,
      }
      console.log("data: ", data);
      var networkConnection = this.connectivityService.isOnline();
      if (networkConnection) {
        this.commonService.addEvent(data).subscribe(
          (res) => {
            if (res.status == 200) {
              if (res.body !== null || res.body !== undefined) {
                // this.societies = JSON.parse(JSON.parse(res["_body"].toString()));
                // console.log("societies: ", this.societies);
                this.addEventFormGroup.reset();
                this.addEventFormGroup.controls.eTitle.setValue('');
                this.addEventFormGroup.controls.eTitle.reset();
                this.addEventFormGroup.controls.eDesc.setValue('');
                this.addEventFormGroup.controls.eDesc.reset();
                this.storageService.storeObject("new_event_added", true);
                this.router.navigate(["events"]);
                // this.location.back();
              } else {
                // this.societies = SocietyListing.societies;
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

  onFileChange(files: FileList) {
    if (files[0].size <= 2097152) {
      this.fileToUpload = files.item(0);
      this.fileName = this.makeString() + ".jpg";
      this.addEventFormGroup.controls.eImg.setValue(this.fileName);
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
    this.saveEventImage();
  }

  makeString(): string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 32; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
  }

  saveEventImage() {
    let data = {
      MediaSrc: this.base64Img,
      MediaFileName: this.fileName
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.saveEventImage(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              console.log("res: ", res);
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

}
