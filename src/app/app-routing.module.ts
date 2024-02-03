import { MainLayoutComponent } from './components/layout/main-layout/main-layout/main-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-gaurd/auth.garud';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { SuccessPageComponent } from './shared/components/success-page/success-page.component';
import { AdminlayoutComponent } from './components/admin/adminlayout/adminlayout.component';
const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./modules/auth/auth.module').then((m) => m.AuthModule),
  // },
  {
    path: 'success',
    component: SuccessPageComponent,
  },
  {
    path: 'error',
    component: ErrorPageComponent,
  },
  {
    path: 'admin',
    //canActivate: [AuthGuard],
    component: AdminlayoutComponent,
    // children: DASHBOARDLAYOUT_ROUTES
    loadChildren: () =>
      import('./components/admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
  {
    path: '',
    //canActivate: [AuthGuard],
    component: MainLayoutComponent,
    // children: DASHBOARDLAYOUT_ROUTES
    loadChildren: () =>
      import('./components/home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  
  
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
