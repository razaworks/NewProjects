import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewdocPage } from './viewdoc.page';

const routes: Routes = [
  {
    path: '',
    component: ViewdocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewdocPageRoutingModule {}
