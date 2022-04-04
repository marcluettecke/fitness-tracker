import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggingsPage } from './loggings.page';

const routes: Routes = [
  {
    path: '',
    component: LoggingsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoggingsPageRoutingModule {}
