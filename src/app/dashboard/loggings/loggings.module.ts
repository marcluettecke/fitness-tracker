import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoggingsPageRoutingModule } from './loggings-routing.module';

import { LoggingsPage } from './loggings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoggingsPageRoutingModule
  ],
  declarations: [LoggingsPage]
})
export class LoggingsPageModule {}
