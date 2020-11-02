import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddnoticePage } from './addnotice.page';

const routes: Routes = [
  {
    path: '',
    component: AddnoticePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddnoticePageRoutingModule {}
