import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../common/services/storage.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConnectivityService } from '../common/services/connectivityCheck.service';
import { CommonService } from '../common/services/common.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {
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

  m: any;

  constructor(
    private router: Router,
    private ac: ActivatedRoute,
    private storageService: StorageService,
    private fb: FormBuilder,
    private connectivityService: ConnectivityService,
    private commonService: CommonService,
    private globals: Globals,
  ) {
    this.userInfo = this.globals.userInfo;
    if (this.userInfo === null || this.userInfo === undefined) {
      this.router.navigate(["login"]);
    }
    this.ac.queryParams.subscribe((params) => {
      this.m = params["m"];
    });

    if (this.m !== null && this.m !== undefined) {
      this.userInfo = this.m;
    }
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


}
