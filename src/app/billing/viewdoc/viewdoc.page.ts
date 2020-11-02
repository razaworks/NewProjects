import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-viewdoc',
  templateUrl: './viewdoc.page.html',
  styleUrls: ['./viewdoc.page.scss'],
})
export class ViewdocPage implements OnInit {
  img: any;
  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.img = this.navParams.get("img");
  }

  close() {
    this.modalController.dismiss();
  }

}
