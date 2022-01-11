import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeStatePageRoutingModule } from './make-state-routing.module';

import { MakeStatePage } from './make-state.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    MakeStatePageRoutingModule
  ],
  declarations: [MakeStatePage]
})
export class MakeStatePageModule {}
