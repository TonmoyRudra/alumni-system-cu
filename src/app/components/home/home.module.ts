import { SharedModule } from './../../shared/modules/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { DevExtremeModule, DxGalleryModule } from 'devextreme-angular';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { EventComponent } from './event/event.component';
import { MemberdetailsComponent } from './memberdetails/memberdetails.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MemberListComponent } from './member-list/member-list.component';


@NgModule({
  declarations: [
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    EventComponent,
    MemberdetailsComponent,
    GalleryComponent,
    MemberListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    DevExtremeModule,
    DxGalleryModule

  ]
})
export class HomeModule { }
