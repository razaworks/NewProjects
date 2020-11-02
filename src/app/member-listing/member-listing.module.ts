import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemberListingPageRoutingModule } from './member-listing-routing.module';

import { MemberListingPage } from './member-listing.page';
import { HeaderModule } from '../components/header/header.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemberListingPageRoutingModule,
    HeaderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  declarations: [MemberListingPage]
})
export class MemberListingPageModule { }
