import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditnoticePageRoutingModule } from './editnotice-routing.module';

import { EditnoticePage } from './editnotice.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderModule,
    IonicModule,
    EditnoticePageRoutingModule
  ],
  declarations: [EditnoticePage]
})
export class EditnoticePageModule {}
