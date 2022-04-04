import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardPage} from './dashboard.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: DashboardPage,
    children: [
      {
        path: 'loggings',
        loadChildren: () => import('./loggings/loggings.module').then(m => m.LoggingsPageModule)
      },
      {
        path: 'records',
        loadChildren: () => import('./records/records.module').then(m => m.RecordsPageModule)
      },
      {
        path: '',
        redirectTo: '/dashboard/tabs/loggings',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard/tabs/loggings',
    pathMatch: 'full'
  }
];

@NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule],
          })
export class DashboardPageRoutingModule {
}
