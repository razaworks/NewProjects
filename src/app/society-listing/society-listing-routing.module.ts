import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocietyListingPage } from './society-listing.page';

const routes: Routes = [
  {
    path: '',
    component: SocietyListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocietyListingPageRoutingModule {}
