import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenBillPage } from './gen-bill.page';

const routes: Routes = [
  {
    path: '',
    component: GenBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenBillPageRoutingModule {}
