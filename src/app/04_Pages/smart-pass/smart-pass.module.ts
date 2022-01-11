import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmartPassPageRoutingModule } from './smart-pass-routing.module';

import { SmartPassPage } from './smart-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmartPassPageRoutingModule
  ],
  declarations: [SmartPassPage]
})
export class SmartPassPageModule {}
