import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlatListingPage } from './flat-listing.page';

const routes: Routes = [
  {
    path: '',
    component: FlatListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlatListingPageRoutingModule {}
