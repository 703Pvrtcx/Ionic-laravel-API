import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevicesPage } from './devices.page';

const routes: Routes = [
  {
    path: '',
    component: DevicesPage,
    children:[
      {
        path: '',
        loadChildren: () => import('./../../../06_System/make-state/make-state.module').then(m =>m.MakeStatePageModule)
      },
      {
        path: 'make-state',
        loadChildren: () => import('./../../../06_System/make-state/make-state.module').then(m =>m.MakeStatePageModule)
      },
      {
        path: 'edit-state/:id',
        loadChildren: () => import('./../../../06_System/edit-state/edit-state.module').then( m => m.EditStatePageModule)
      },
    ],
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevicesPageRoutingModule {}
