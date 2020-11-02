import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingPage } from './billing.page';

const routes: Routes = [
  {
    path: '',
    component: BillingPage
  },
  {
    path: 'bills',
    loadChildren: () => import('./billsb/billsb.module').then( m => m.BillsbPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./paymentsb/paymentsb.module').then( m => m.PaymentsbPageModule)
  },
  {
    path: 'outstanding-dues',
    loadChildren: () => import('./osdues/osdues.module').then( m => m.OsduesPageModule)
  },
  {
    path: 'view-document',
    loadChildren: () => import('./viewdoc/viewdoc.module').then( m => m.ViewdocPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingPageRoutingModule {}
