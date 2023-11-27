import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { authGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./UserPages/user-pages.module').then((m) => m.UserPagesModule),
  },

  {
    path: 'Dashboard',
    canActivate: [authGuard],
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./task/task.module').then((m) => m.TaskModule),
      },
    ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
