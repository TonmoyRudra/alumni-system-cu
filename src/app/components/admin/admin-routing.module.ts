
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { EventtransactionapproveComponent } from './eventtransactionapprove/eventtransactionapprove.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';
import { AuthGuard } from 'src/app/auth-gaurd/auth.garud';

const routes: Routes = [
  {
    path: '',
    component: AdmindashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admindashboard',
    component: AdmindashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: AdmindashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'logout',
    component: AdmindashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'eventtransactionapprove',
    component: EventtransactionapproveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
