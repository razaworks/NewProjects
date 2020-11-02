import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocRegPageRoutingModule } from './soc-reg-routing.module';

import { SocRegPage } from './soc-reg.page';
import { HeaderModule } from '../components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SocRegPageRoutingModule,
    //HeaderModule,
  ],
  declarations: [
    SocRegPage,
  ]
})
export class SocRegPageModule {}
