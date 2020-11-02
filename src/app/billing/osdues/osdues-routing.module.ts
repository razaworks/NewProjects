import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OsduesPage } from './osdues.page';

const routes: Routes = [
  {
    path: '',
    component: OsduesPage
  },
  {
    path: 'member-statements',
    loadChildren: () => import('./member-statements/member-statements.module').then( m => m.MemberStatementsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OsduesPageRoutingModule {}
