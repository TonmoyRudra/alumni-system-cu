import { SharedModule } from './../../shared/modules/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevExtremeModule } from 'devextreme-angular';
import { AdminRoutingModule } from './admin-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { EventtransactionapproveComponent } from './eventtransactionapprove/eventtransactionapprove.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';



@NgModule({
  declarations: [
    AdmindashboardComponent,
    EventtransactionapproveComponent,
    AdminlayoutComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    DevExtremeModule

  ]
})
export class AdminModule { }
