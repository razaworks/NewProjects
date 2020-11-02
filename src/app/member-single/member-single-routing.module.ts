import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberSinglePage } from './member-single.page';

const routes: Routes = [
  {
    path: '',
    component: MemberSinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberSinglePageRoutingModule {}
