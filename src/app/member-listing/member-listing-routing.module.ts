import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberListingPage } from './member-listing.page';

const routes: Routes = [
  {
    path: '',
    component: MemberListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberListingPageRoutingModule {}
