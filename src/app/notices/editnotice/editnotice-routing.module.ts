import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditnoticePage } from './editnotice.page';

const routes: Routes = [
  {
    path: '',
    component: EditnoticePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditnoticePageRoutingModule {}
