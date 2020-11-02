import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberStatementsPage } from './member-statements.page';

const routes: Routes = [
  {
    path: '',
    component: MemberStatementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberStatementsPageRoutingModule {}
