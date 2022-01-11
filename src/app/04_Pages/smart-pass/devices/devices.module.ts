import { EditStatePageModule } from './../../../06_System/edit-state/edit-state.module';
import { MakeStatePage } from './../../../06_System/make-state/make-state.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevicesPageRoutingModule } from './devices-routing.module';

import { DevicesPage } from './devices.page';
import { MakeStatePageModule } from 'src/app/06_System/make-state/make-state.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevicesPageRoutingModule,
    MakeStatePageModule,
    EditStatePageModule
  ],
  declarations: [DevicesPage]
})
export class DevicesPageModule {}
