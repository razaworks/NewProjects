import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocRegPage } from './soc-reg.page';

const routes: Routes = [
  {
    path: '',
    component: SocRegPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocRegPageRoutingModule {}
