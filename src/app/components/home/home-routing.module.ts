import { EventComponent } from './event/event.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/shared/components/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/app/auth-gaurd/auth.garud';
import { MemberdetailsComponent } from './memberdetails/memberdetails.component';
import { GalleryComponent } from './gallery/gallery.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: HomeComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'about',
    component: HomeComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'event',
    component: EventComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'member',
    component: MemberdetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'change-password',
  //   component: ChangePasswordComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'cohort',
  //   canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./cohort-config/cohort-config.module').then(
  //       (m) => m.CohortConfigModule
  //     ),
  // },
  // {
  //   path:'uploader',
  //   canActivate: [AuthGuard],
  //   component: UploaderFromExcelComponent,
  // },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
