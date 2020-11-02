import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticesPageRoutingModule } from './notices-routing.module';

import { NoticesPage } from './notices.page';
import { HeaderModule } from '../components/header/header.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticesPageRoutingModule,
    HeaderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  declarations: [NoticesPage]
})
export class NoticesPageModule {}
