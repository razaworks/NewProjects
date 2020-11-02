import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/common/services/common.service';
import { ConnectivityService } from 'src/app/common/services/connectivityCheck.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-addnotice',
  templateUrl: './addnotice.page.html',
  styleUrls: ['./addnotice.page.scss'],
})
export class AddnoticePage implements OnInit {
  addNoticeFormGroup: FormGroup;
  nTitle: FormControl;
  nDesc: FormControl;
  nImg: FormControl;
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
    this.addNoticeFormGroup = this.fb.group({
      nTitle: ['', [Validators.required, Validators.maxLength(20)]],
      nDesc: ['', [Validators.required, Validators.maxLength(250)]],
      nImg: ['']
    });
  }

  addNotice() {
    if (this.addNoticeFormGroup.valid) {
      let data = {
        noticeTitle: this.addNoticeFormGroup.controls.nTitle.value,
        noticeDesc: this.addNoticeFormGroup.controls.nDesc.value,
        noticeImg: "/ImageStorage/notices/" + this.fileName,
      }
      console.log("data: ", data);
      var networkConnection = this.connectivityService.isOnline();
      if (networkConnection) {
        this.commonService.addNotice(data).subscribe(
          (res) => {
            if (res.status == 200) {
              if (res.body !== null || res.body !== undefined) {
                this.addNoticeFormGroup.reset();
                this.addNoticeFormGroup.controls.nTitle.setValue('');
                this.addNoticeFormGroup.controls.nTitle.reset();
                this.addNoticeFormGroup.controls.nDesc.setValue('');
                this.addNoticeFormGroup.controls.nDesc.reset();
                this.storageService.storeObject("new_notice_added", true);
                this.router.navigate(["notices"]);
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
      this.addNoticeFormGroup.controls.nImg.setValue(this.fileName);
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
    this.saveNoticeImage();
  }

  makeString(): string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 32; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
  }

  saveNoticeImage() {
    let data = {
      MediaSrc: this.base64Img,
      MediaFileName: this.fileName
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.saveNoticeImage(data).subscribe(
        (res) => {
          if (res.status == 200) {
            if (res.body !== null || res.body !== undefined) {
              console.log("res: ", res);
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
