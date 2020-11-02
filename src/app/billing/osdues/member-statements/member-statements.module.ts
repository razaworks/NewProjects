import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberStatementsPageRoutingModule } from './member-statements-routing.module';

import { MemberStatementsPage } from './member-statements.page';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemberStatementsPageRoutingModule,
    HeaderModule
  ],
  declarations: [MemberStatementsPage]
})
export class MemberStatementsPageModule {}
