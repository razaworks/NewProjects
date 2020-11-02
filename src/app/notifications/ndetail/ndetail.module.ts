import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NdetailPageRoutingModule } from './ndetail-routing.module';

import { NdetailPage } from './ndetail.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NdetailPageRoutingModule,
    HeaderModule
  ],
  declarations: [NdetailPage]
})
export class NdetailPageModule {}
