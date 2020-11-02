import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewdocPageRoutingModule } from './viewdoc-routing.module';

import { ViewdocPage } from './viewdoc.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewdocPageRoutingModule,
    HeaderModule
  ],
  declarations: [ViewdocPage]
})
export class ViewdocPageModule {}
