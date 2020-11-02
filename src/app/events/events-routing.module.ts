import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPage } from './events.page';

const routes: Routes = [
  {
    path: '',
    component: EventsPage
  },
  {
    path: 'add',
    loadChildren: () => import('./addevent/addevent.module').then( m => m.AddeventPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./editevent/editevent.module').then( m => m.EditeventPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsPageRoutingModule {}
