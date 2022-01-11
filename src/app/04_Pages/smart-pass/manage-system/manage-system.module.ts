import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageSystemPageRoutingModule } from './manage-system-routing.module';

import { ManageSystemPage } from './manage-system.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageSystemPageRoutingModule
  ],
  declarations: [ManageSystemPage]
})
export class ManageSystemPageModule {}
