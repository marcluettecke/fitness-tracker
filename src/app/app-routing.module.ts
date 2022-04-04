import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'loggings',
    loadChildren: () => import('./dashboard/loggings/loggings.module').then(m => m.LoggingsPageModule)
  },
  {
    path: 'records',
    loadChildren: () => import('./dashboard/records/records.module').then(m => m.RecordsPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  }
];

@NgModule({
            imports: [
              RouterModule.forRoot(routes)
            ],
            exports: [RouterModule]
          })
export class AppRoutingModule {
}
