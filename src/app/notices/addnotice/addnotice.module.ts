import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddnoticePageRoutingModule } from './addnotice-routing.module';

import { AddnoticePage } from './addnotice.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddnoticePageRoutingModule,
    HeaderModule
  ],
  declarations: [AddnoticePage]
})
export class AddnoticePageModule {}
