import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/services/common.service';
import { ConnectivityService } from 'src/app/common/services/connectivityCheck.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-addpayment',
  templateUrl: './addpayment.page.html',
  styleUrls: ['./addpayment.page.scss'],
})
export class AddpaymentPage implements OnInit {
  months: any[] = [
    { monthSequ: 1, monthVal: 0, monthText: 1 },
    { monthSequ: 2, monthVal: 1, monthText: 2 },
    { monthSequ: 3, monthVal: 2, monthText: 3 },
    { monthSequ: 4, monthVal: 3, monthText: 4 },
    { monthSequ: 5, monthVal: 4, monthText: 5 },
    { monthSequ: 6, monthVal: 5, monthText: 6 },
    { monthSequ: 7, monthVal: 6, monthText: 7 },
    { monthSequ: 8, monthVal: 7, monthText: 8 },
    { monthSequ: 9, monthVal: 8, monthText: 9 },
    { monthSequ: 10, monthVal: 9, monthText: 10 },
    { monthSequ: 11, monthVal: 10, monthText: 11 },
    { monthSequ: 12, monthVal: 11, monthText: 12 }
  ];
  years: any[] = [
    { yearSequ: 1, yearVal: 2021, yearText: 2021 },
    { yearSequ: 2, yearVal: 2020, yearText: 2020 },
    { yearSequ: 3, yearVal: 2019, yearText: 2019 },
    { yearSequ: 4, yearVal: 2018, yearText: 2018 }
  ];
  addPaymentFormGroup: FormGroup;
  month: FormControl;
  year: FormControl;
  amount: FormControl;
  type: FormControl;
  instrumentID: FormControl;
  desc: FormControl;
  userInfo: any;
  fileToUpload: File = null;
  fileName: string = '';
  base64Img: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private commonService: CommonService,
    private connectivityService: ConnectivityService,
    private globals: Globals,
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
    this.addPaymentFormGroup = this.fb.group({
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      type: ['', [Validators.required]],
      instrumentID: [''],
      desc: [''],
      upload: ['']
    });
  }

  checkTransType() {
    const type = this.addPaymentFormGroup.controls.type.value;
    const instrumentID = this.addPaymentFormGroup.controls.instrumentID;
    if (type !== "1" && type !== null && type !== undefined && type !== '') {
      instrumentID.setValidators([Validators.required]);
      return true;
    } else {
      instrumentID.setValidators([]);
      instrumentID.setValue('');
      return false;
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  addPayment() {
    if (this.addPaymentFormGroup.valid) {
      let data = {
        persSequ: this.userInfo.PersSequ,
        socSequ: this.userInfo.SocSequ,
        forMonth: new Date(this.addPaymentFormGroup.controls.month.value).getMonth(),
        forYear: new Date(this.addPaymentFormGroup.controls.year.value).getFullYear(),
        transAmount: parseInt(this.addPaymentFormGroup.controls.amount.value),
        paymentType: parseInt(this.addPaymentFormGroup.controls.type.value),
        instrumentID: this.addPaymentFormGroup.controls.instrumentID.value,
        desc: this.addPaymentFormGroup.controls.desc.value,
        imagePath: this.fileName
      }
      console.log("data: ", data);
      var networkConnection = this.connectivityService.isOnline();
      if (networkConnection) {
        this.commonService.addPayment(data).subscribe(
          (res) => {
            if (res.status == 200) {
              if (res.body !== null || res.body !== undefined) {
                console.log("res: ", res);
                alert("Successfully Added!");
                this.location.back();
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
    } else {
      alert("Please fill all details!");
    }
  }

  onFileChange(files: FileList) {
    if (files[0].size <= 2097152) {
      this.fileToUpload = files.item(0);
      this.fileName = this.makeString() + ".jpg";
      this.addPaymentFormGroup.controls.upload.setValue(this.fileName);
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
    this.saveBillingImage();
  }

  makeString(): string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 32; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }

    return outString;
  }

  saveBillingImage() {
    let data = {
      imgStr: this.base64Img,
      imgName: this.fileName
    };
    var networkConnection = this.connectivityService.isOnline();
    if (networkConnection) {
      this.commonService.saveBillingImage(data).subscribe(
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

  back() {
    this.location.back();
  }

}
