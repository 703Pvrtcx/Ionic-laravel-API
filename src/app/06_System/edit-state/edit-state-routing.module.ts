import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditStatePage } from './edit-state.page';

const routes: Routes = [
  {
    path: '',
    component: EditStatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditStatePageRoutingModule {}
