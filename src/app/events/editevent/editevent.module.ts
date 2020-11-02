import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditeventPageRoutingModule } from './editevent-routing.module';

import { EditeventPage } from './editevent.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HeaderModule,
    EditeventPageRoutingModule
  ],
  declarations: [EditeventPage]
})
export class EditeventPageModule {}
