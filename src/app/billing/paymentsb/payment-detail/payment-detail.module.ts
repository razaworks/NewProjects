import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentDetailPageRoutingModule } from './payment-detail-routing.module';

import { PaymentDetailPage } from './payment-detail.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { ViewdocPageModule } from '../../viewdoc/viewdoc.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentDetailPageRoutingModule,
    HeaderModule,
    ViewdocPageModule
  ],
  declarations: [PaymentDetailPage]
})
export class PaymentDetailPageModule {}
