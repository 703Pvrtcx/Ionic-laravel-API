import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditStatePageRoutingModule } from './edit-state-routing.module';

import { EditStatePage } from './edit-state.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    IonicModule,
    EditStatePageRoutingModule
  ],
  declarations: [EditStatePage]
})
export class EditStatePageModule {}
