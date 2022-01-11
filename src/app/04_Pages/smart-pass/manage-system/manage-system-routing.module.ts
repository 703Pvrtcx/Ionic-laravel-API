import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageSystemPage } from './manage-system.page';

const routes: Routes = [
  {
    path: '',
    component: ManageSystemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSystemPageRoutingModule {}
