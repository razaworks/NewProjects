import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NdetailPage } from './ndetail.page';

const routes: Routes = [
  {
    path: '',
    component: NdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NdetailPageRoutingModule {}
