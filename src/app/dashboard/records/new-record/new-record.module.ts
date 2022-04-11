import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewRecordPageRoutingModule } from './new-record-routing.module';

import { NewRecordPage } from './new-record.page';
import { PageZeroComponent } from './page-zero/page-zero.component';
import { PageOneLiftComponent } from './page-one-lift/page-one-lift.component';
import { PageOneWodComponent } from './page-one-wod/page-one-wod.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NewRecordPageRoutingModule],
  declarations: [
    NewRecordPage,
    PageZeroComponent,
    PageOneLiftComponent,
    PageOneWodComponent,
  ],
})
export class NewRecordPageModule {}
