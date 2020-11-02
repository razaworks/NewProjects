import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticesPage } from './notices.page';

const routes: Routes = [
  {
    path: '',
    component: NoticesPage
  },
  {
    path: 'add',
    loadChildren: () => import('./addnotice/addnotice.module').then( m => m.AddnoticePageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./editnotice/editnotice.module').then( m => m.EditnoticePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticesPageRoutingModule {}
