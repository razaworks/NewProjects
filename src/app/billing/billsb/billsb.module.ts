import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillsbPageRoutingModule } from './billsb-routing.module';

import { BillsbPage } from './billsb.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeaderModule,
    IonicModule,
    BillsbPageRoutingModule
  ],
  declarations: [BillsbPage]
})
export class BillsbPageModule {}
