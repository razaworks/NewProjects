import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocietyListingPageRoutingModule } from './society-listing-routing.module';

import { SocietyListingPage } from './society-listing.page';
import { HeaderModule } from '../components/header/header.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocietyListingPageRoutingModule,
    HeaderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ],
  declarations: [SocietyListingPage]
})
export class SocietyListingPageModule { }
