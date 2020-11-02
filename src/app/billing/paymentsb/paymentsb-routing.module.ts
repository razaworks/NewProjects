import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsbPage } from './paymentsb.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsbPage
  },
  {
    path: 'add',
    loadChildren: () => import('./addpayment/addpayment.module').then( m => m.AddpaymentPageModule)
  },
  {
    path: 'payment-details',
    loadChildren: () => import('./payment-detail/payment-detail.module').then( m => m.PaymentDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsbPageRoutingModule {}
