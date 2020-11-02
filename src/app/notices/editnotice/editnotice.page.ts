import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { ConnectivityService } from 'src/app/common/services/connectivityCheck.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-editnotice',
  templateUrl: './editnotice.page.html',
  styleUrls: ['./editnotice.page.scss'],
})
export class EditnoticePage implements OnInit {
  editNoticeFormGroup: FormGroup;
  nTitle: FormControl;
  nDesc: FormControl;
  nImg: FormControl;
  userInfo: any;
  notice: any;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private commonService: CommonService,
    private connectivityService: ConnectivityService,
    private globals: Globals,
    private fb: FormBuilder,
  ) { 
    this.userInfo = this.globals.userInfo;
    if (this.userInfo == null || this.userInfo == undefined) {
      this.router.navigate(["login"]);
    }

    this.notice = this.storageService.getObject("notice");
    if (this.notice == null) {
      this.router.navigate(["notices"]);
    }
  }

  ngOnInit() {
    this.initFormValidations();
    this.editNoticeFormGroup.get("nTitle").setValue(this.notice.noticeTitle);
    this.editNoticeFormGroup.get("nDesc").setValue(this.notice.noticeDesc);
  }

  initFormValidations() {
    this.editNoticeFormGroup = this.fb.group({
      nTitle: ['', [Validators.required, Validators.maxLength(20)]],
      nDesc: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  isEdited() {
    const nTitle = this.editNoticeFormGroup.get("nTitle").value;
    const nDesc = this.editNoticeFormGroup.get("nDesc").value;
    let r1: boolean, r2: boolean;
    (nTitle !== this.notice.noticeTitle) ? r1 = true: r1 = false;
    (nDesc !== this.notice.noticeDesc) ? r2 = true: r2 = false;
    if (r1 === false && r2 === false) {
      return false;
    } else {
      return true;
    }
  }

  editNotice() {
    if (this.editNoticeFormGroup.valid && this.isEdited()) {
      let data = {
        noticeSequ: this.notice.noticeSequ,
        noticeTitle: this.editNoticeFormGroup.controls.nTitle.value,
        noticeDesc: this.editNoticeFormGroup.controls.nDesc.value
      }
      console.log("data: ", data);
      var networkConnection = this.connectivityService.isOnline();
      if (networkConnection) {
        this.commonService.editNotice(data).subscribe(
          (res) => {
            if (res.status == 200) {
              if (res.body !== null || res.body !== undefined) {
                // this.societies = JSON.parse(JSON.parse(res["_body"].toString()));
                // console.log("societies: ", this.societies);
                this.editNoticeFormGroup.reset();
                this.editNoticeFormGroup.controls.nTitle.setValue('');
                this.editNoticeFormGroup.controls.nTitle.reset();
                this.editNoticeFormGroup.controls.nDesc.setValue('');
                this.editNoticeFormGroup.controls.nDesc.reset();
                this.notice.noticeTitle = data.noticeTitle;
                this.notice.noticeDesc = data.noticeDesc;
                this.storageService.storeObject("notice_edited", this.notice);
                this.storageService.removeObject("notice");
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

}
