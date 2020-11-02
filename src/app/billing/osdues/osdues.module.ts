import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OsduesPageRoutingModule } from './osdues-routing.module';

import { OsduesPage } from './osdues.page';
import { HeaderModule } from 'src/app/components/header/header.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OsduesPageRoutingModule,
    HeaderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  declarations: [OsduesPage]
})
export class OsduesPageModule {}
