import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeStatePage } from './make-state.page';

const routes: Routes = [
  {
    path: '',
    component: MakeStatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeStatePageRoutingModule {}
