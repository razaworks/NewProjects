import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenBillPageRoutingModule } from './gen-bill-routing.module';

import { GenBillPage } from './gen-bill.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GenBillPageRoutingModule,
    HeaderModule
  ],
  declarations: [GenBillPage]
})
export class GenBillPageModule {}
