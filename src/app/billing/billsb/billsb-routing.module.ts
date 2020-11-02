import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillsbPage } from './billsb.page';

const routes: Routes = [
  {
    path: '',
    component: BillsbPage
  },
  {
    path: 'generate',
    loadChildren: () => import('./gen-bill/gen-bill.module').then( m => m.GenBillPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsbPageRoutingModule {}
