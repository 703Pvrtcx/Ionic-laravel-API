import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmartPassPage } from './smart-pass.page';

const routes: Routes = [
  {
    path: '',
    component: SmartPassPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmartPassPageRoutingModule {}
