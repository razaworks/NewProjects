import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { ConnectivityService } from 'src/app/common/services/connectivityCheck.service';
import { StorageService } from 'src/app/common/services/storage.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-editevent',
  templateUrl: './editevent.page.html',
  styleUrls: ['./editevent.page.scss'],
})
export class EditeventPage implements OnInit {
  editEventFormGroup: FormGroup;
  eTitle: FormControl;
  eDesc: FormControl;
  eImg: FormControl;
  userInfo: any;
  event: any;

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

    this.event = this.storageService.getObject("event");
    if (this.event == null) {
      this.router.navigate(["index"]);
    }
  }

  ngOnInit() {
    this.initFormValidations();
    this.editEventFormGroup.get("eTitle").setValue(this.event.eventTitle);
    this.editEventFormGroup.get("eDesc").setValue(this.event.eventDesc);
  }

  initFormValidations() {
    this.editEventFormGroup = this.fb.group({
      eTitle: ['', [Validators.required, Validators.maxLength(20)]],
      eDesc: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  isEdited() {
    const eTitle = this.editEventFormGroup.get("eTitle").value;
    const eDesc = this.editEventFormGroup.get("eDesc").value;
    let r1: boolean, r2: boolean;
    (eTitle !== this.event.eventTitle) ? r1 = true : r1 = false;
    (eDesc !== this.event.eventDesc) ? r2 = true : r2 = false;
    if (r1 === false && r2 === false) {
      return false;
    } else {
      return true;
    }
  }

  editEvent() {
    if (this.editEventFormGroup.valid && this.isEdited()) {
      let data = {
        eventSequ: this.event.eventSequ,
        eventTitle: this.editEventFormGroup.controls.eTitle.value,
        eventDesc: this.editEventFormGroup.controls.eDesc.value
      }
      console.log("data: ", data);
      var networkConnection = this.connectivityService.isOnline();
      if (networkConnection) {
        this.commonService.editEvent(data).subscribe(
          (res) => {
            if (res.status == 200) {
              if (res.body !== null || res.body !== undefined) {
                //this.societies = JSON.parse(res.body.toString());
                // console.log("societies: ", this.societies);
                this.editEventFormGroup.reset();
                this.editEventFormGroup.controls.eTitle.setValue('');
                this.editEventFormGroup.controls.eTitle.reset();
                this.editEventFormGroup.controls.eDesc.setValue('');
                this.editEventFormGroup.controls.eDesc.reset();
                this.event.eventTitle = data.eventTitle;
                this.event.eventDesc = data.eventDesc;
                this.storageService.storeObject("event_edited", this.event);
                this.storageService.removeObject("event");
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

}
