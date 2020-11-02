import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentsbPageRoutingModule } from './paymentsb-routing.module';

import { PaymentsbPage } from './paymentsb.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    IonicModule,
    PaymentsbPageRoutingModule
  ],
  declarations: [PaymentsbPage]
})
export class PaymentsbPageModule {}
