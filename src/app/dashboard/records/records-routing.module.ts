import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordsPage } from './records.page';

const routes: Routes = [
  {
    path: '',
    component: RecordsPage,
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./new-record/new-record.module').then(
        (m) => m.NewRecordPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsPageRoutingModule {}
