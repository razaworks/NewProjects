import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberSinglePageRoutingModule } from './member-single-routing.module';

import { MemberSinglePage } from './member-single.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemberSinglePageRoutingModule
  ],
  declarations: [MemberSinglePage]
})
export class MemberSinglePageModule {}
