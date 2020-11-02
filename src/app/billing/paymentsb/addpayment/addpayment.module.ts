import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddpaymentPageRoutingModule } from './addpayment-routing.module';

import { AddpaymentPage } from './addpayment.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddpaymentPageRoutingModule,
    HeaderModule
  ],
  declarations: [AddpaymentPage]
})
export class AddpaymentPageModule {}
